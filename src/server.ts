import 'dotenv/config';
import { app } from './app'

// abrindo a aplicação na porta 3333
app.listen(3333, () => console.log('Server is running'));