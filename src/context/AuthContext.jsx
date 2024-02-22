import { createContext, useContext, useEffect, useState } from "react";
import {auth, db} from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import {setDoc, doc} from 'firebase/firestore'

// Crear un contexto para el manejo de la autenticación
const AuthContext = createContext()
// Proveedor de contexto para gestionar la autenticación
export function AuthContextProvider({children}) {
    // Estado local para almacenar la información del usuario
    const [user, setUser] = useState({})
// Función para registrar un nuevo usuario
    // Función para registrar un nuevo usuario
async function signUp(email, password){
    try {
        // Crear usuario en la autenticación
         await createUserWithEmailAndPassword(auth, email, password);
        
        // Crear un documento en Firestore para el usuario
        await setDoc(doc(db, 'users', email), {
            savedShows: []
        });

        // Si llegamos aquí, el usuario se ha creado correctamente y el documento en Firestore también se ha creado
        console.log("Usuario creado exitosamente");
    } catch (error) {
        // Manejar cualquier error que ocurra durante el proceso
        console.error("Error al crear usuario:", error);
    }
}
// Función para iniciar sesión
    function logIn(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }
// Función para cerrar sesión
    function logOut(){
        return signOut(auth)
    }
// Efecto secundario para suscribirse a cambios en la autenticación
    useEffect(() => {
        // Devuelve la función de desubscripción para limpiar cuando el componente se desmonta
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            // Actualiza el estado local con la información del usuario actual
            setUser(currentUser)
        })
        // Limpieza al desmontar el componente
        return() => {
            unsubscribe()
        }
    })
    // Proporciona el contexto y sus funciones a los componentes secundarios
    return (
        <AuthContext.Provider value={{signUp, logIn, logOut, user}}>
            {children}
        </AuthContext.Provider>
    )
    
}
// Hook personalizado para acceder al contexto de autenticación
export function UserAuth() {
    return useContext(AuthContext)
}