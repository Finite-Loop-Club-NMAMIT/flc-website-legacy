import { signUpHandler } from 'next-auth-sanity';
import { client } from 'your/sanity/client';

export default signUpHandler(client);