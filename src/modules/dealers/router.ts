import { Router } from "express";
import { tryCatch } from "../../api/middlewares";
import { createNew, getAll, updateName, deleteOne } from "./service";

const router = Router();

router.post("/", tryCatch(async (req, res) => {
    const { name, manufacturerId } = req.body;
    const result = await createNew({ name, manufacturerId });
    res.json(result);
}));

router.get("/", tryCatch( async (_, res) => {
    const result = await getAll();
    res.json(result);
}));

router.patch("/:dealerId", tryCatch(async(req, res) => {
    const { dealerId } = req.params;
    const { name } = req.body;
    const result = await updateName({ _id: dealerId, name });
    res.json(result);
}));

router.delete("/:dealerId", async (req, res) => {
    const { dealerId } = req.params;
    await deleteOne(dealerId);
    res.sendStatus(200);
});

export { router };
