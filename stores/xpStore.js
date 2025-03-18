import { getAuth } from 'firebase/auth'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'

export const useXPStore = defineStore('xp', {
  state: () => ({
    xp: 0, // Initial XP state
    level: 1, // Initial level
    showPopup: false, // Initial visibility of the level-up popup
    leveledUpTo: 0, // Initial level the user leveled up to in one go
  }),
  actions: {
    // Fetch XP and level from Firestore for the current user
    async fetchXP() {
      const auth = getAuth()
      const user = auth.currentUser

      if (user) {
        const db = getFirestore() // rm db's because already globally defined
        const userDocRef = doc(db, 'users', user.uid)

        try {
          const docSnap = await getDoc(userDocRef)
          if (docSnap.exists()) {
            const data = docSnap.data()
            this.xp = data.xp || 0 // Update local state with Firestore data
            this.level = data.level || 1 // Update local state with Firestore data
          }
          else {
            this.xp = 0 // Default to 0 if no document exists
            this.level = 1 // Default to level 1 if no document exists
          }
        }
        catch (error) {
          console.error('Error fetching XP:', error)
        }
      }
    },

    // Add XP and update Firestore
    async addXP(xpAmount) {
      this.xp += xpAmount // Update local state
      this.updateLevel() // Update level based on new XP
      await this.saveXPToFirestore() // Save to Firestore
    },

    // Reset XP and update Firestore
    async resetXP() {
      this.xp = 0 // Reset local state
      this.level = 1 // Reset local state
      this.leveledUpTo = 0 // Reset local state
      this.showPopup = false // Reset local state
      await this.saveXPToFirestore() // Save to Firestore
    },

    // Save the current XP and level to Firestore
    async saveXPToFirestore() {
      const auth = getAuth()
      const user = auth.currentUser

      if (user) {
        const db = getFirestore()
        const userDocRef = doc(db, 'users', user.uid)

        try {
          await setDoc(userDocRef, {
            xp: this.xp, // Save the current XP
            level: this.level, // Save the current level
          }, { merge: true }) // Merge with existing document data
        }
        catch (error) {
          console.error('Error saving XP and level to Firestore:', error)
        }
      }
    },

    // Calculate the total XP needed for the next level
    totalXpNeededForNextLevel() {
      return this.level * 10
    },

    // Update the player's level based on XP
    updateLevel() {
      while (this.xp >= this.totalXpNeededForNextLevel()) {
        this.xp -= this.totalXpNeededForNextLevel() // Subtract required XP for current level-up
        this.level++
        this.leveledUpTo = this.level // Track the current level-up
        this.showPopup = true // Show level-up popup
      }
    },

    // Calculate the current progress towards the next level -> currently not used
    xpProgress() {
      return (this.xp / this.totalXpNeededForNextLevel()) * 100
    },

    // Close the level-up popup
    closePopup() {
      this.showPopup = false
    },
  },
})
