const express = require("express")
const router = express.Router()
const ExpressError = require("../expressError")
const items = require("../fakeDb")

router.get("", function(req,res){
    try {
        res.json({items})
    } catch (err) {
        res.status(500).json({error: err.message})
    }
});

router.post("", function (req, res) {
  const newItem = { name: req.body.name, price: req.body.price }
  items.push(newItem)
  res.status(201).json({ added: newItem })
})

router.get("/:name", function (req, res) {
  const foundItem = items.find(item => item.name === req.params.name)
  if(foundItem === undefined){
    throw new ExpressError("Item not found", 404)
  }
  res.json({ item: foundItem })
})

router.patch("/:name", function (req, res) {
  const foundItem = items.find(item => item.name === req.params.name)
  if (foundItem === undefined) {
    throw new ExpressError("Item not found", 404)
  }
  foundItem.name = req.body.name
  foundItem.price = req.body.price
  res.json({ updated: foundItem })
})

router.delete("/:name", function (req, res) {
  const foundItem = items.findIndex(item => item.name === req.params.name)
  if (foundItem === -1) {
    throw new ExpressError("Item not found", 404)
  }
  items.splice(foundItem, 1)
  res.json({ message: "Deleted" })
})

module.exports = router;