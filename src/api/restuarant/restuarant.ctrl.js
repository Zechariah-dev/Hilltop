const { validationResult } = require("express-validator")
const { restuarantServiceError } = require("../../config/restuarant.config")
const Branch = require("../../model/branch.model")
const Restuarant = require("../../model/restuarant.model")
const User = require("../../model/user.model")
const { BadRequestError } = require("../../validation/errors")

const RestuarantCtrl = {
    async create(req, res) {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            throw new BadRequestErrorWithPayload(
                globalErrors.GLOBAL_ERR_VALIDATION_ERROR,
                { errors: errors.array() }
            )
        }

        const exsitingRestuarant = await Restuarant.query().findOne({
            name: req.body.name,
        })

        if (exsitingRestuarant) {
            throw new BadRequestError(
                restuarantServiceError.RESTUARANT_ERR_RESTUARANT_ALREADY_EXIST
            )
        }

        const restuarant = await Restuarant.query().insert({
            ...req.body,
            ownerId: req.user.id,
        })

        return res.status(201).json(restuarant)
    },
    async delete(req, res) {
        await Restuarant.transaction(async (trx) => {
            const restuarant = await Restuarant.query(trx)
                .where("id", req.params.restuarantId)
                .where("ownerId", req.user.id)
                .delete()
                .throwIfNotFound({
                    error: new BadRequestError(
                        restuarantServiceError.RESTUARANT_ERR_RESTUARANT_NOT_FOUND
                    ),
                })

            await User.query(trx)
                .patch({ restuarant: 0 })
                .where("restuarant", "=", req.params.restuarantId)

            await Branch.query(trx)
                .where("restuarant", req.params.restuarantId)
                .delete()

            return restuarant
        })

        return res.json({ message: "restuarant deleted" })
    },
    async update(req, res) {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            throw new BadRequestErrorWithPayload(
                globalErrors.GLOBAL_ERR_VALIDATION_ERROR,
                { errors: errors.array() }
            )
        }

        const restuarant = await Restuarant.query()
            .patchAndFetchById(req.params.restuarantId, req.body)
            .throwIfNotFound({
                error: new BadRequestError(
                    restuarantServiceError.RESTUARANT_ERR_RESTUARANT_NOT_FOUND
                ),
            })
            .withGraphFetched("owner")

        return res.json(restuarant)
    },
    async getUserRestuarants(req, res) {
        const restuarants = await Restuarant.query()
            .withGraphFetched("owner")
            .where("ownerId", req.user.id)

        return res.json(restuarants)
    },
    async getRestuarants(req, res) {
        const restuarants = await Branch.query().withGraphFetched(
            "restuarant.owner"
        )

        return res.json(restuarants)
    },
}

module.exports = RestuarantCtrl
