
const EventSource = require('eventsource')

import { log } from '../log'

import { EventEmitter } from 'events'

import config from '../config'

import { transactionQueue } from '../planaria'

export function sapience_bmap_socket(): EventEmitter {

  const emitter = new EventEmitter()

  const bmap_query = {
    "v": 3,
    "q": {
      "find": {
        //"MAP.type": {"in": ["post", "message"]}
        "MAP.tags": {"$in": ["1F9E9","1F4A1","1F48E", "test"]}
      },
      "project": {
          out:0,
          in:0
      },
    }
  }  
  let query_b64 = btoa(JSON.stringify(bmap_query)) 

  const sock = new EventSource('https://b.map.sv/s/'+query_b64)

  sock.onmessage = async function(e){

    let payload = JSON.parse(e.data)
    console.log(payload)
    if(payload.type === "push"){
        const post = {
            AIP: payload[0].AIP,
            B: payload[0].B,
            MAP: payload[0].MAP,
            timestamp: payload[0].timestamp,
            tx_id: payload[0].tx.h,
            source:"bmap"
        }
        console.log(post)
        return
        transactionQueue.push(post)

    }

  }

  return emitter
}

interface OnchainTransaction {
  tx_id: string;
  tx_index: number;
  app_id: string;
  key: string;
  value: string;
  nonce?: string;
  author?: string;
  signature?: string;
  source?: string;
}

export function bitsocket(app_id: string): EventEmitter {

  const emitter = new EventEmitter()

  const block_height = 0

  const query = {
    q: {
      find: {
        "out.s2": "onchain",
        "out.s3": app_id
      },
      project: {
        "raw": 1,
        "blk": 1,
        "tx.h": 1,
        "timestamp": 1,
        "out.i": 1,
        "out.s2": 1,
        "out.s3": 1,
        "out.s4": 1,
        "out.s5": 1,
        "out.s6": 1,
        "out.s7": 1,
        "out.s8": 1,
        "out.s9": 1,
        "out.s10": 1,
        "out.s11": 1,
        "out.o1": 1
      }
    },
  }

  var b64 = Buffer.from(JSON.stringify(Object.assign({"v": 3}, query))).toString("base64")

  const sock = new EventSource('https://txo.bitsocket.network/s/'+b64)

  sock.onmessage = async function(e){

    let payload = JSON.parse(e.data)

    if (payload.data.length > 0) {

      const event = payload.data[0]

      const output = {
        app_id: event.out[0].s3,
        key: event.out[0].s4,
        value: event.out[0].s5,
        txid: event['tx']['h'],
        timestamp: event['timestamp'],
        index: event['tx']['i']
      }

      if (emitter) {

        try {

          output.value = JSON.parse(output.value)

          emitter.emit(output.key, output.value)

          emitter.emit('*', output)

        } catch(error) {

          log.debug('onchain.bitsocket.json.parse.error', error)

        }

      }

      let outputs = event.out
        .filter(({s2}) => s2 === 'onchain')
        .filter(({s3}) => s3 === app_id)

      outputs.map(output => {

        let message: OnchainTransaction = {
          tx_id: event['tx']['h'],
          tx_index: output['i'],
          app_id: output['s3'],
          key: output['s4'],
          value: JSON.parse(output['s5']),
          nonce: output['s6'],
          author: output['s7'],
          signature: output['s8'],
          source: 'bitsocket'
        }

        transactionQueue.push(message)
      })


    }

  }

  return emitter
}

export function onchain(app_id: string): EventEmitter {

  return bitsocket(app_id)

}