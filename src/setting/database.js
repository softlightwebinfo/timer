import PouchDB from "pouchdb";
import moment from 'moment';
import { generateUniqueId } from "./functions";

export const db = new PouchDB('timer');

export class Models {
  static async createTask({ value }) {
    return await db.post({
      _id: generateUniqueId(),
      name: value,
      created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      tasks: []
    });
  }

  static watchAddTimer(callback) {
    db.changes({
      since: 'now',
      live: true,
      include_docs: true
    }).on('change', function (change) {
      // change.id contains the doc id, change.doc contains the doc
      callback(change);
    }).on('error', function (err) {
      // handle errors
    });
  }

  static async getAllTask() {
    return await db.allDocs({
      include_docs: true,
      attachments: true
    })
  }

  static async getTask(id) {
    return await db.get(id);
  }

  static async createTimer(id, body) {
    try {
      const doc = await db.get(id);
      doc.tasks.push(body);
      await db.put({
        _id: id,
        _rev: doc._rev,
        ...doc,
      });
      const docs = await db.get(id);
      console.log(docs)
    } catch (err) {
      console.log(err);
    }
  }
}
