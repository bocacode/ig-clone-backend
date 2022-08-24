import app from '.';
import { createServer } from 'http';

const server = createServer(app);

const PORT = 5001;
server.listen(PORT, () => {
  console.log('we started on port', PORT);
});
