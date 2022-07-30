const { validationResult } = require("express-validator")
const Restuarant = require("../../model/restuarant.model")
const Branch = require("../../model/branch.model")
const {
    BadRequestErrorWithPayload,
    BadRequestError,
} = require("../../validation/errors")
const { globalErrors } = require("../../config/globals")
const { restuarantServiceError } = require("../../config/restuarant.config")
const { branchServiceError } = require("../../config/branch.config")

const BranchCtrl = {
    async create(req, res) {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            throw new BadRequestErrorWithPayload(
                globalErrors.GLOBAL_ERR_VALIDATION_ERROR,
                { errors: errors.array() }
            )
        }

        const branch = await Branch.transaction(async (trx) => {
            const restuarant = await Restuarant.query(trx)
                .findById(req.query.restuarantId)
                .throwIfNotFound({
                    error: new BadRequestError(
                        restuarantServiceError.RESTUARANT_ERR_RESTUARANT_NOT_FOUND
                    ),
                })

            let branch = await Branch.query(trx).findOne({
                restuarantId: parseInt(req.query.restuarantId),
                address: req.body.address,
            })

            if (branch) {
                throw new BadRequestError(
                    branchServiceError.BRANCH_ERR_ADDRESS_ALREADY_IN_USE
                )
            }

            branch = await Branch.query(trx).insert({
                ...req.body,
                manager: req.user.id,
                restuarantId: parseInt(req.query.restuarantId),
            })

            return branch
        })

        return res.status(201).json({ data: branch })
    },
    async getRestuarantBranches(req, res) {
        const branches = await Branch.query().where(
            "restuarantId",
            req.query.restuarantId
        )

        return res.json(branches)
    },
    async getAllBranches(req, res) {
        const branches = await Branch.query()
            .orderBy("created_at", "desc")
            .withGraphFetched("restuarant.owner")

        return res.json(branches)
    },
    async deleteBranch(req, res) {
        await Branch.query()
            .findById(req.params.branchId)
            .withGraphJoined("restuarant")
            .where("restuarant.ownerId", req.user.id)
            .throwIfNotFound({
                error: new BadRequestError(
                    branchServiceError.BRANCH_ERR_BRANCH_NOT_FOUND
                ),
            })
            .delete()

        return res.json({ message: "branch deleted" })
    },
    async updateBranch(req, res) {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        let branch = await Branch.query()
            .withGraphJoined("restuarant")
            .where("restuarant.ownerId", req.user.id)
            .patchAndFetchById(req.params.branchId, req.body)
            .throwIfNotFound({
                error: new BadRequestError(
                    branchServiceError.BRANCH_ERR_BRANCH_NOT_FOUND
                ),
            })

        branch = await Branch.query()
            .findById(req.params.branchId)
            .withGraphFetched("restuarant.owner")

        return res.json(branch)
    },
}

module.exports = BranchCtrl
