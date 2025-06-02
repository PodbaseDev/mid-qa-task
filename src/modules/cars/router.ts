import { Router } from "express";
import { tryCatch } from "../../api/middlewares";
import { createNew, getAll, updateOne } from "./service";

const router = Router();

router.post("/", tryCatch(async (req, res) => {
    const { model, manufacturerId } = req.body;
    const result = await createNew({ model, manufacturerId });
    res.json(result);
}));

router.get("/", tryCatch(async (req, res) => {
    const result = await getAll();
    res.json(result);
}));

router.patch("/:carId", tryCatch(async (req, res) => {
    const { carId } = req.params;
    const { status, dealerId } = req.body;
    const result = await updateOne({ _id: carId, status, dealerId });
    res.json(result);
}));

export { router };
