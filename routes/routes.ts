import { Router, Request, Response } from "express";


const router = Router();

router.get('/messages', (req: Request, res: Response)=>{

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    res.json({
        ok:true,
        msg: 'everything ok',
        cuerpo,
        de
    });

});

router.post('/messages/:id', (req: Request, res: Response)=>{

    const header=  req.params.id;

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    res.json({
        ok:true,
        msg: 'POST - Ready',
        header,
        cuerpo,
        de
    });

});

export default router;