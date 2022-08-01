const { validationResult } = require("express-validator")
const Menu = require("../../model/menu.model")
const {
    BadRequestErrorWithPayload,
    BadRequestError,
} = require("../../validation/errors")
const { globalErrors } = require("../../config/globals")
const { menuServiceError } = require("../../config/menu.config")
const User = require("../../model/user.model")

const MenuController = {
    async create(req, res) {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            throw new BadRequestErrorWithPayload(
                globalErrors.GLOBAL_ERR_VALIDATION_ERROR,
                { errors: errors.array() }
            )
        }

        let menu = await Menu.query()
            .findOne({ name: req.body.name })
            .where("branchId", req.body.branchId)

        console.log(menu)

        if (menu) {
            throw new BadRequestError(
                menuServiceError.MENUITEM_ERR_MENUITEM_ALREADY_EXIST
            )
        }

        menu = await Menu.query().insert(req.body)

        return res.status(201).json(menu)
    },
    async fetch(req, res) {
        const menus = await Menu.query()
            .where("branchId", req.params.id)
            .withGraphJoined("branch")
            .withGraphJoined("menu_items")
            .throwIfNotFound({
                error: new BadRequestError(
                    menuServiceError.MENU_ERR_MENU_NOT_FOUND
                ),
            })

        return res.json(menus)
    },
    async fetchOne(req, res) {
        const menu = await Menu.query()
            .findById(req.params.id)
            .throwIfNotFound({
                error: new BadRequestError(
                    menuServiceError.MENU_ERR_MENU_NOT_FOUND
                ),
            })

        return res.json(menu)
    },
    async delete(req, res) {
        const user = await User.query().findById(req.user.id)

        await Menu.query()
            .findById(req.params.id)
            .withGraphJoined("branch")
            .where("branch.restuarantId", user.restuarant)
            .throwIfNotFound({
                error: new BadRequestError(
                    menuServiceError.MENU_ERR_MENU_NOT_FOUND
                ),
            })
            .delete()

        return res.json({ message: "menu deleted" })
    },
    async update(req, res) {
        const user = await User.query().findById(req.user.id)

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            throw new BadRequestErrorWithPayload(
                globalErrors.GLOBAL_ERR_VALIDATION_ERROR,
                { errors: errors.array() }
            )
        }

        let menu = await Menu.query()
            .withGraphJoined("branch")
            .where("branch.restuarantId", user.restuarant)
            .patchAndFetchById(req.params.id, req.body)
            .throwIfNotFound({
                error: new BadRequestError(
                    menuServiceError.MENU_ERR_MENU_NOT_FOUND
                ),
            })

        menu = await Menu.query()
            .findById(req.params.id)
            .withGraphJoined("branch")
            .withGraphJoined("menu_items")

        return res.json(menu)
    },
}

module.exports = MenuController
