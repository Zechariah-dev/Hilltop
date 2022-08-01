const { validationResult } = require("express-validator")
const MenuItem = require("../../model/menuitem.model")
const {
    BadRequestErrorWithPayload,
    BadRequestError,
} = require("../../validation/errors")
const { globalErrors } = require("../../config/globals")
const { menuitemServiceError } = require("../../config/menuitem.config")

const MenuItemCtrl = {
    async create(req, res) {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            throw new BadRequestErrorWithPayload(
                globalErrors.GLOBAL_ERR_VALIDATION_ERROR,
                { errors: errors.array() }
            )
        }

        const existingMenuItem = await MenuItem.findByName({
            name: req.body.name,
        })

        if (existingMenuItem) {
            throw new BadRequestError(
                menuitemServiceError.MENUITEM_ERR_MENUITEM_ALREADY_EXIST
            )
        }

        const payload = {
            ...req.body,
            created_by: req.user.id,
        }

        const menuitem = await MenuItem.query().insert(payload)

        return res.status(201).json(menuitem)
    },
    async getAll(req, res) {
        const menuitems = await MenuItem.query()
            .where((builder) => {
                if (req.query.price)
                    builder.whereBetween("price", req.query.price)

                if (req.query.category)
                    builder.where("category", req.query.category)
            })
            .withGraphFetched("created_by_user")

        return res.json(menuitems)
    },
    async getOne(req, res) {
        const menuitem = await MenuItem.query()
            .findById(req.params.id)
            .withGraphFetched("created_by_user")
            .throwIfNotFound({
                error: new BadRequestError(
                    menuitemServiceError.MENUITEM_ERR_MENUITEM_NOT_FOUND
                ),
            })

        return res.json(menuitem)
    },
    async delete(req, res) {
        const menuitem = await MenuItem.query()
            .findById(req.params.id)
            .where("created_by", req.user.id)
            .throwIfNotFound({
                error: new BadRequestError(
                    menuitemServiceError.MENUITEM_ERR_MENUITEM_NOT_FOUND
                ),
            })
            .delete()

        return res.json({ message: "menuitem deleted" })
    },
    async update(req, res) {
        if (!errors.isEmpty()) {
            throw new BadRequestErrorWithPayload(
                globalErrors.GLOBAL_ERR_VALIDATION_ERROR,
                { errors: errors.array() }
            )
        }

        const menuitem = await Menuitem.query()
            .findById(req.params.id)
            .where("created_by", req.user.id)
            .throwIfNotFound({
                error: new BadRequestError(
                    menuitemServiceError.MENUITEM_ERR_MENUITEM_NOT_AUTHORIZED
                ),
            })
            .update(req.body)
            .withGraphJoined("created_by_user")

        return res.json(menuitem)
    },
}

module.exports = MenuItemCtrl
