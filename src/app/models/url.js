import mongoose, { Schema } from 'mongoose';
import timestamp from 'mongoose-timestamp';

const UrlSchema = new Schema({
    target: { type: String },
    shortid: { type: String },
});
UrlSchema.plugin(timestamp);

export default mongoose.model('URL', UrlSchema)