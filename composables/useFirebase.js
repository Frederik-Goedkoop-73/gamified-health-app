import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'

export async function createUser(email, password) {
  const auth = getAuth()
  const credentials = await createUserWithEmailAndPassword(auth, email, password)
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
    })
  return credentials
}
