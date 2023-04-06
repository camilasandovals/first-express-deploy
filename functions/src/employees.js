import { db } from "./dbConnect.js";
//Imported to get timestamp (1/2)
import { FieldValue } from "firebase-admin/firestore";

const coll = db.collection("employees");

//ADD
export async function addEmploye(req, res) {
  const newEmployee = req.body;
  newEmployee.createdAt = FieldValue.serverTimestamp()
  await coll.add(newEmployee);
  res.status(201).send({ message: "Employee successfully added." });
}

//GET
export async function getAllEmployees(req, res) {
  const collection = coll.get();
  const employees = collection.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  res.status(200).send(employees);
}

//DELETE
export async function deleteEmployee(req, res) {
  const { id } = req.params;
  // const id = req.params.id
  await coll.doc(id).delete();
  res.status(202).send("Employee has been deleted")

}

//UPDATE
export async function updateEmployee(req,res) {
    const { id } = req.params;

    const updateInfo = req.body;

    await coll.doc(id).update(updateInfo);
    res.status(202).send("Employee has been updated")
}