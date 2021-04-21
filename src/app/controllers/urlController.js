import Url from '../models';
import shortid from 'shortid';

export const create = async (req, res) => {
    try {
        if (!req.validate(['target'])) return;
        let { target } = req.body;

        let newUrl = new Url({
            target, 
            shortid
        });
        newUrl.save();

        return res.validSend(200, { newUrl });
    } catch (error) {
        return res.validSend(200, { error })
    }
}