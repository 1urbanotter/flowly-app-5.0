import { useEffect, useState, useCallback } from "react";
import { db } from "../utils/firebase"; // Assuming your firebase config is in utils/firebase.js
import {
  collection,
  query,
  onSnapshot,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc, // Import setDoc for creating documents with merge option
} from "firebase/firestore";
import toast from "react-hot-toast"; // Assuming you use toast for notifications

// Custom hook for generic Firestore collection operations (e.g., 'accounts', 'transactions')
export const useFirestore = (collectionName, userId) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If no userId, stop loading and return
    if (!userId) {
      setLoading(false);
      return;
    }

    // Define collection reference and query inside useEffect to ensure it's fresh for current userId
    const colRef = collection(db, `users/${userId}/${collectionName}`);
    const q = query(colRef); // Can add orderBy here if needed (e.g., orderBy('createdAt', 'desc'))

    // Set up real-time listener for the collection
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(fetchedData);
        setLoading(false);
        setError(null); // Clear any previous error on successful data fetch
      },
      (err) => {
        // Handle errors during real-time fetch
        console.error("Firestore fetch error:", err);
        setError(err);
        setLoading(false);
        toast.error(`Error loading ${collectionName}: ${err.message}`);
      }
    );

    // Clean up the listener when the component unmounts or dependencies change
    return () => unsubscribe();
  }, [collectionName, userId]); // Dependencies for this effect

  // Callback to add a new document to the collection
  const addDocument = useCallback(
    async (docData) => {
      if (!userId) {
        toast.error("User not logged in to add document.");
        return false;
      }
      setLoading(true);
      try {
        const colRef = collection(db, `users/${userId}/${collectionName}`); // Ensure collection ref is fresh
        await addDoc(colRef, { ...docData, createdAt: new Date() });
        toast.success(`${collectionName.slice(0, -1)} added successfully!`);
        return true;
      } catch (err) {
        console.error("Error adding document:", err);
        setError(err);
        toast.error(
          `Error adding ${collectionName.slice(0, -1)}: ${err.message}`
        );
        return false;
      } finally {
        setLoading(false);
      }
    },
    [collectionName, userId] // Dependencies for useCallback
  );

  // Callback to update an existing document in the collection
  const updateDocument = useCallback(
    async (id, docData) => {
      if (!userId) {
        toast.error("User not logged in to update document.");
        return false;
      }
      setLoading(true);
      try {
        const docRef = doc(db, `users/${userId}/${collectionName}`, id);
        await updateDoc(docRef, docData);
        toast.success(`${collectionName.slice(0, -1)} updated successfully!`);
        return true;
      } catch (err) {
        console.error("Error updating document:", err);
        setError(err);
        toast.error(
          `Error updating ${collectionName.slice(0, -1)}: ${err.message}`
        );
        return false;
      } finally {
        setLoading(false);
      }
    },
    [collectionName, userId] // Dependencies for useCallback
  );

  // Callback to delete a document from the collection
  const deleteDocument = useCallback(
    async (id) => {
      if (!userId) {
        toast.error("User not logged in to delete document.");
        return false;
      }
      // Confirmation dialog before deleting
      if (
        !window.confirm(
          `Are you sure you want to delete this ${collectionName.slice(0, -1)}?`
        )
      ) {
        return false;
      }
      setLoading(true);
      try {
        const docRef = doc(db, `users/${userId}/${collectionName}`, id);
        await deleteDoc(docRef);
        toast.success(`${collectionName.slice(0, -1)} deleted successfully!`);
        return true;
      } catch (err) {
        console.error("Error deleting document:", err);
        setError(err);
        toast.error(
          `Error deleting ${collectionName.slice(0, -1)}: ${err.message}`
        );
        return false;
      } finally {
        setLoading(false);
      }
    },
    [collectionName, userId] // Dependencies for useCallback
  );

  return { data, loading, error, addDocument, updateDocument, deleteDocument };
};

// Hook for user-specific settings document (e.g., theme, unitLabel)
export const useUserSettings = (userId) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    // Reference to the single user settings document
    const settingsDocRef = doc(db, "users", userId, "settings", "userSettings");

    // Set up real-time listener for the settings document
    const unsubscribe = onSnapshot(
      settingsDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          // If document exists, set settings from its data
          setSettings(docSnap.data());
        } else {
          // *** MODIFICATION START ***
          // If the settings document doesn't exist, create it with initial defaults,
          // but EXCLUDE the 'theme' field.
          // This ensures ThemeContext uses the system preference if no explicit theme is set.
          const initialDefaultSettings = {
            unitLabel: "units",
            defaultAccountId: null,
            // theme: "system", // REMOVED: Do NOT set a default 'theme' here
          };
          setSettings(initialDefaultSettings); // Set local state immediately

          // Create the document in Firestore if it doesn't exist.
          // `setDoc` with `merge: true` is safe: it creates if non-existent, merges if exists.
          setDoc(settingsDocRef, initialDefaultSettings, { merge: true })
            .then(() =>
              console.log(
                "User settings document created with initial non-theme defaults."
              )
            )
            .catch((err) =>
              console.error(
                "Error creating initial user settings document:",
                err
              )
            );
          // *** MODIFICATION END ***
        }
        setLoading(false);
      },
      (err) => {
        // Handle errors during real-time fetch
        console.error("Firestore settings fetch error:", err);
        setError(err);
        setLoading(false);
        toast.error(`Error loading settings: ${err.message}`);
      }
    );

    // Clean up the listener
    return () => unsubscribe();
  }, [userId]); // Dependency: userId

  // Callback to update user settings
  const updateSettings = useCallback(
    async (newSettings) => {
      if (!userId) {
        toast.error("User not logged in to update settings.");
        return false;
      }
      setLoading(true);
      try {
        const settingsDocRef = doc(
          db,
          "users",
          userId,
          "settings",
          "userSettings"
        );
        // Use `setDoc` with `merge: true` to update specific fields.
        // It will also create the document if it doesn't exist, making it robust for initial updates.
        await setDoc(settingsDocRef, newSettings, { merge: true });
        toast.success("Settings updated!");
        // Optimistically update local state to reflect changes immediately
        setSettings((prev) => ({ ...prev, ...newSettings }));
        return true;
      } catch (err) {
        console.error("Error updating settings:", err);
        setError(err);
        toast.error(`Error updating settings: ${err.message}`);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [userId] // Dependency: userId
  );

  return { settings, loading, error, updateSettings };
};
