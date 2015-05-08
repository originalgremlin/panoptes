* must install ffmpeg, pocketsphinx

brew install cmu-pocketsphinx

* extract text from audio
  (The input file needs to be a single-channel (monaural), little-endian, unheadered 16-bit signed PCM audio file sampled at 16000 Hz.)

ffmpeg -y -i input.wav -ac 1 -f s16le -acodec pcm_s16le -ar 16k output.wav
pocketsphinx_continuous -infile test/data/goforward.raw -hmm model/en-us/en-us -lm model/en-us/en-us.lm.dmp -dict model/en-us/cmudict-en-us.dict


* 2-way video chat
* multi-way video chat
* BUG: switching tabs causes audio recording to fail (video, oddly enough, still works)
