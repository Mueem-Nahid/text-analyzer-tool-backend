import { parentPort, workerData } from 'worker_threads';

if (parentPort) {
  const { text, chunkSize, functionName } = workerData;

  let count = 0;

  for (let i = 0; i < text.length; i += chunkSize) {
    const chunk = text.substring(i, i + chunkSize);
    count += functionName(chunk);
  }

  parentPort.postMessage(count);
}
