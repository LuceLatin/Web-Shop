const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Proizvod = require("../models/proizvod");
const Proizvodac = require("../models/proizvodac");
const roleMiddleware = require("../middleware/roleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

// Dodaj proizvod
router.post("/add", roleMiddleware, async (req, res) => {
  const user = req.user;
  if (user && user.isAdmin) {
    const { naziv, cijena, postotakKakaa, boja, tip, proizvodac } = req.body;

    try {
      const newProduct = new Proizvod({
        naziv,
        cijena,
        postotakKakaa,
        boja,
        tip,
        proizvodac,
      });

      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: error.message });
    }
  } else {
    res.sendStatus(403); // Forbidden
  }
});

// Dohvati sve proizvode
router.get("/products", authMiddleware, async (req, res) => {
  try {
    const proizvodi = await Proizvod.find().populate("proizvodac", "naziv");
    res.json(proizvodi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Dohvati jedan proizvod po ID-u
router.get("/products/:id", async (req, res) => {
  try {
    const proizvod = await Proizvod.findById(req.params.id).populate(
      "proizvodac",
      "naziv"
    );

    if (!proizvod) {
      return res.status(404).json({ message: "Proizvod nije pronađen" });
    }

    res.json(proizvod);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Izbrisi proizvod po id-u
router.delete("/proizvod/delete/:id", roleMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    // Pronađi proizvod prema ID-u
    const proizvod = await Proizvod.findById(id);

    if (!proizvod) {
      return res.status(404).json({ error: "Proizvod nije pronađen." });
    }

    await proizvod.deleteOne();
    res.json({ message: "Proizvod uspješno obrisan." });
  } catch (error) {
    console.error("Greška prilikom brisanja proizvoda:", error.message);
    res.status(500).json({ error: "Greška prilikom brisanja proizvoda." });
  }
});

//Update proizvod po id
router.put("/proizvod/update/:id", roleMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const updatedProizvod = await Proizvod.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedProizvod);
  } catch (error) {
    console.error("Greška prilikom ažuriranja proizvoda:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

//PROIZVODAC

// Dodaj novog proizvođača
router.post("/dodajProizvodaca", roleMiddleware, async (req, res) => {
  const user = req.user;

  if (user && user.isAdmin) {
    const { naziv, godinaOsnivanja, drzava, opisFirme, logoURL } = req.body;

    try {
      const noviProizvodac = new Proizvodac({
        naziv,
        godinaOsnivanja,
        drzava,
        opisFirme,
        logoURL,
      });

      const spremljeniProizvodac = await noviProizvodac.save();
      res.status(201).json(spremljeniProizvodac);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.sendStatus(403); // Forbidden
  }
});

// Dohvati sve proizvođače
router.get("/proizvodaci", authMiddleware, async (req, res) => {
  try {
    const proizvodaci = await Proizvodac.find();
    res.json(proizvodaci);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Dohvati jedog proizvodaca po ID-u
router.get("/proizvodac/:id", authMiddleware, async (req, res) => {
  try {
    id = req.params.id;
    const proizvodac = await Proizvodac.findById(id);
    if (!proizvodac) {
      return res.status(404).json({ message: "Proizvodac nije pronađen" });
    }

    res.json(proizvodac);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Provjera da li postoji proizvod s tim proizvodacem (id)
router.get("/proizvodac-proizvod/:id", roleMiddleware, async (req, res) => {
  try {
    id = req.params.id;
    const proizvodac = await Proizvodac.findById(id);
    const povezaniArtikli = await Proizvod.exists({
      proizvodac: proizvodac._id,
    });

    if (!proizvodac) {
      return res.status(404).json({ message: "Proizvodac nije pronađen" });
    }

    res.json(povezaniArtikli);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Brisanje proizvođača po id
router.delete("/proizvodac/delete/:id", roleMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    // Pronađi proizvod prema ID-u
    const proizvodac = await Proizvodac.findById(id);

    if (!proizvodac) {
      return res.status(404).json({ error: "Proizvodac nije pronađen." });
    }
    // Postoje li artikli povezani s ovim proizvođačem
    const povezaniArtikli = await Proizvod.exists({ proizvodac: id });

    if (povezaniArtikli) {
      return res.status(400).json({
        error:
          "Nije moguće obrisati proizvođača jer postoje artikli povezani s njim.",
      });
    }

    await proizvodac.deleteOne();
    res.json({ message: "Proizvodac uspješno obrisan." });
  } catch (error) {
    console.error("Greška prilikom brisanja proizvodaca:", error.message);
    res.status(500).json({ error: "Greška prilikom brisanja proizvodaca." });
  }
});

//Azuriranje proizvodaca
router.put("/proizvodac/update/:id", roleMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const updatedProizvodac = await Proizvodac.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log("Proizvodac uspjesno azuriran.");
    res.json(updatedProizvodac);
  } catch (error) {
    console.error("Greška prilikom ažuriranja proizvodaca:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Ruta za filtriranje proizvoda
router.post("/obarana",authMiddleware, async (req, res) => {
  const { proizvodac, postotakKakaa } = req.body;
  console.log("obrana ", proizvodac, postotakKakaa);

  try {
    // Primjer filtriranja prema proizvodacu i postotkuKakaa
    const filteredProizvodi = await Proizvod.find({
      proizvodac: proizvodac,
      postotakKakaa: { $gte: postotakKakaa },
    }).populate("proizvodac", "naziv");

    console.log("Uspjesno!!!");
    res.json(filteredProizvodi);
  } catch (error) {
    console.error("Greška u obrani!!!", error.message);
    res.status(500).json({ error: "obrana: Server error" });
  }
});


module.exports = router;



module.exports = router;
