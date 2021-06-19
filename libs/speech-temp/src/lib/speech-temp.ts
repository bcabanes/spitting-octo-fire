import * as path from 'node:path';
import * as util from 'node:util';
import * as fs from 'fs-extra';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';

// https://cloud.google.com/text-to-speech/docs/libraries#client-libraries-usage-nodejs
// https://cloud.google.com/text-to-speech#section-2
async function main() {
  const client = new TextToSpeechClient();
  const text = `
    It’s surprising that this book even needs to exist.
    Over the course of human history, we have seen the benefits
    of infinite thinking so many times.

    The rise of great societies, advancements in science and
    medicine and the exploration of space all happened because
    large groups of people, united in common cause, chose to
    collaborate with no clear end in sight.

    If a rocket that was headed for the stars crashed,
    for example, we figured out what was wrong and
    tried again... and again... and again. And even after we
    succeeded, we kept going. We did these things not because
    of the these things because we felt like we were contributing
    to something bigger than ourselves, something with value that
    would last well beyond our own lifetimes.
  `;
  const outputFile = path.resolve(path.join(__dirname, 'output.mp3'));

  const request: any = {
    input: { text: text },
    voice: {
      languageCode: 'en-US',
      name: 'en-US-Wavenet-B',
      // ssmlGender: 'FEMALE',
    },
    audioConfig: {
      audioEncoding: 'LINEAR16',
      effectsProfileId: ['large-home-entertainment-class-device'],
      pitch: 0,
      speakingRate: 1,
    },
  };
  const [response] = await client.synthesizeSpeech(request);
  const writeFile = util.promisify(fs.writeFileSync);
  await writeFile(outputFile, response.audioContent, 'binary');
  console.log(`Audio content written to file: ${outputFile}`);
}

main();
