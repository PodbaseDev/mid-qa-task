import { Router } from "express";
import { tryCatch } from "../../api/middlewares";
import { Manufacturer } from "./types";
import { createNew, getAll, updateMake, deleteOne } from "./service";

const router = Router();

router.post("/", tryCatch(async (req, res) => {
    const { make } = req.body;
    const result = await createNew({ make });
    res.json(result);
}));

router.get("/", tryCatch( async (req, res) => {
    const result = await getAll();
    res.json(result);
}));

router.patch("/:manufacturerId", tryCatch(async(req, res) => {
    const { manufacturerId } = req.params;
    const { make } = req.body;
    const result = await updateMake({ _id: manufacturerId, make });
    res.json(result);
}));

router.delete("/:manufacturerId", async (req, res) => {
    const { manufacturerId } = req.params;
    await deleteOne(manufacturerId);
    res.sendStatus(200);
});

export { router };
