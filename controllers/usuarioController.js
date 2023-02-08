import Usuario from "../models/Usuario.js";

const registrar = async (req, res) => {
    const { email } = req.body;

    const existeUsuario = await Usuario.findOne({email});
    if(existeUsuario) {
        const error = new Error('Ya existe un usuario registrado con este email');
        return res.status(400).json({msg: error.message});
    }

    try {
        const usuario = new Usuario(req.body);
        const usuarioGuardado = await usuario.save()
        res.json(usuarioGuardado);

    } catch (error) {
        console.log(error);
    }  
};

const perfil = (req, res) => {
    res.json({msg: 'Mostrando perfil'});
}

const confirmar = async (req, res) => {
    const {token} = req.params;
    const usuarioConfirmar = await Usuario.findOne({token});
    if(!usuarioConfirmar) {
        const error = new Error('Token no encontrado')
        return res.status(400).json({msg: error.message});
    }

    try {
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = '';
        res.json('Usuario Confirmado!!')
        await usuarioConfirmar.save();
    } catch (error) {
        console.log(error);
    }
}

export {
    registrar, perfil, confirmar
}