const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function validPassword(value) {
    if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(value)) {
        return true;
    } else {
        return false;
    }
};

exports.signup = (req, res, next) => {
    if (validPassword(req.body.password) == true) {
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = new User({
                    email: req.body.email,
                    password: hash
                });
                user.save()
                    .then(() => res.status(201).json({ message: 'Nouveau compte enregistré !' }))
                    .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
    } else {
        res.status(400).json({ message: 'Mot de passe invalide !' });
    }
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé !' })
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Mot de passe incorrect !' })
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            {userId: user.id},
                            'RANDOM',
                            {expiresIn: '24h'}
                        )
                    })
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
};