import type { Badge } from '~/types/badge'

export const badges: Badge[] = [
  {
    category: 'Marathon Stepper 🚶‍➡️',
    badges: [
      { id: '1', type: 'steps', tier: 'Bronze I', requirement: 'Walk 10,000 steps', target: 10000, icon: '/badges/Steps/Steps_B1.png', stars: 1, coins: 10, claimed: false, completed: false },
      { id: '2', type: 'steps', tier: 'Bronze II', requirement: 'Walk 25,000 steps', target: 25000, icon: '/badges/Steps/Steps_B2.png', stars: 2, coins: 25, claimed: false, completed: false },
      { id: '3', type: 'steps', tier: 'Bronze III', requirement: 'Walk 50,000 steps', target: 50000, icon: '/badges/Steps/Steps_B3.png', stars: 3, coins: 50, claimed: false, completed: false },
      { id: '4', type: 'steps', tier: 'Silver I', requirement: 'Walk 75,000 steps', target: 75000, icon: '/badges/Steps/Steps_S1.png', stars: 4, coins: 100, claimed: false, completed: false },
      { id: '5', type: 'steps', tier: 'Silver II', requirement: 'Walk 100,000 steps', target: 100000, icon: '/badges/Steps/Steps_S2.png', stars: 5, coins: 150, claimed: false, completed: false },
      { id: '6', type: 'steps', tier: 'Silver III', requirement: 'Walk 150,000 steps', target: 150000, icon: '/badges/Steps/Steps_S3.png', stars: 6, coins: 200, claimed: false, completed: false },
      { id: '7', type: 'steps', tier: 'Gold I', requirement: 'Walk 200,000 steps', target: 200000, icon: '/badges/Steps/Steps_G1.png', stars: 7, coins: 300, claimed: false, completed: false },
      { id: '8', type: 'steps', tier: 'Gold II', requirement: 'Walk 250,000 steps', target: 250000, icon: '/badges/Steps/Steps_G2.png', stars: 8, coins: 500, claimed: false, completed: false },
      { id: '9', type: 'steps', tier: 'Gold III', requirement: 'Walk 300,000 steps', target: 300000, icon: '/badges/Steps/Steps_G3.png', stars: 9, coins: 1000, claimed: false, completed: false },
    ],
  },
  {
    category: 'Calorie Inferno 🔥',
    badges: [
      { id: '10', type: 'calories', tier: 'Bronze I', requirement: 'Burn 1,000 calories', target: 1000, icon: '/badges/Calories/Calories_B1.png', stars: 1, coins: 10, claimed: false, completed: false },
      { id: '11', type: 'calories', tier: 'Bronze II', requirement: 'Burn 2,500 calories', target: 2500, icon: '/badges/Calories/Calories_B2.png', stars: 2, coins: 25, claimed: false, completed: false },
      { id: '12', type: 'calories', tier: 'Bronze III', requirement: 'Burn 5,000 calories', target: 5000, icon: '/badges/Calories/Calories_B3.png', stars: 3, coins: 50, claimed: false, completed: false },
      { id: '13', type: 'calories', tier: 'Silver I', requirement: 'Burn 10,000 calories', target: 10000, icon: '/badges/Calories/Calories_S1.png', stars: 4, coins: 100, claimed: false, completed: false },
      { id: '14', type: 'calories', tier: 'Silver II', requirement: 'Burn 15,000 calories', target: 15000, icon: '/badges/Calories/Calories_S2.png', stars: 5, coins: 150, claimed: false, completed: false },
      { id: '15', type: 'calories', tier: 'Silver III', requirement: 'Burn 20,000 calories', target: 20000, icon: '/badges/Calories/Calories_S3.png', stars: 6, coins: 200, claimed: false, completed: false },
      { id: '16', type: 'calories', tier: 'Gold I', requirement: 'Burn 30,000 calories', target: 30000, icon: '/badges/Calories/Calories_G1.png', stars: 7, coins: 300, claimed: false, completed: false },
      { id: '17', type: 'calories', tier: 'Gold II', requirement: 'Burn 40,000 calories', target: 40000, icon: '/badges/Calories/Calories_G2.png', stars: 8, coins: 500, claimed: false, completed: false },
      { id: '18', type: 'calories', tier: 'Gold III', requirement: 'Burn 50,000 calories', target: 50000, icon: '/badges/Calories/Calories_G3.png', stars: 9, coins: 1000, claimed: false, completed: false },
    ],
  },
  {
    category: 'Distance Runner 🏃‍♂️',
    badges: [
      { id: '19', type: 'distance', tier: 'Bronze I', requirement: 'Walk/run 10 km', target: 10, icon: '/badges/Distance/Distance_B1.png', stars: 1, coins: 10, claimed: false, completed: false },
      { id: '20', type: 'distance', tier: 'Bronze II', requirement: 'Walk/run 20 km', target: 20, icon: '/badges/Distance/Distance_B2.png', stars: 2, coins: 25, claimed: false, completed: false },
      { id: '21', type: 'distance', tier: 'Bronze III', requirement: 'Walk/run 30 km', target: 30, icon: '/badges/Distance/Distance_B3.png', stars: 3, coins: 50, claimed: false, completed: false },
      { id: '22', type: 'distance', tier: 'Silver I', requirement: 'Walk/run 45 km', target: 45, icon: '/badges/Distance/Distance_S1.png', stars: 4, coins: 100, claimed: false, completed: false },
      { id: '23', type: 'distance', tier: 'Silver II', requirement: 'Walk/run 60 km', target: 60, icon: '/badges/Distance/Distance_S2.png', stars: 5, coins: 150, claimed: false, completed: false },
      { id: '24', type: 'distance', tier: 'Silver III', requirement: 'Walk/run 75 km', target: 75, icon: '/badges/Distance/Distance_S3.png', stars: 6, coins: 200, claimed: false, completed: false },
      { id: '25', type: 'distance', tier: 'Gold I', requirement: 'Walk/run 100 km', target: 100, icon: '/badges/Distance/Distance_G1.png', stars: 7, coins: 300, claimed: false, completed: false },
      { id: '26', type: 'distance', tier: 'Gold II', requirement: 'Walk/run 125 km', target: 125, icon: '/badges/Distance/Distance_G2.png', stars: 8, coins: 500, claimed: false, completed: false },
      { id: '27', type: 'distance', tier: 'Gold III', requirement: 'Walk/run 150 km', target: 150, icon: '/badges/Distance/Distance_G3.png', stars: 9, coins: 1000, claimed: false, completed: false },
    ],
  },
  {
    category: 'Go-Getter 🚀',
    badges: [
      { id: '28', type: 'azm', tier: 'Bronze I', requirement: 'Achieve 50 active zone minutes', target: 50, icon: '/badges/AZM/AZM_B1.png', stars: 1, coins: 10, claimed: false, completed: false },
      { id: '29', type: 'azm', tier: 'Bronze II', requirement: 'Achieve 100 active zone minutes', target: 100, icon: '/badges/AZM/AZM_B2.png', stars: 2, coins: 25, claimed: false, completed: false },
      { id: '30', type: 'azm', tier: 'Bronze III', requirement: 'Achieve 150 active zone minutes', target: 150, icon: '/badges/AZM/AZM_B3.png', stars: 3, coins: 50, claimed: false, completed: false },
      { id: '31', type: 'azm', tier: 'Silver I', requirement: 'Achieve 200 active zone minutes', target: 200, icon: '/badges/AZM/AZM_S1.png', stars: 4, coins: 100, claimed: false, completed: false },
      { id: '32', type: 'azm', tier: 'Silver II', requirement: 'Achieve 300 active zone minutes', target: 300, icon: '/badges/AZM/AZM_S2.png', stars: 5, coins: 150, claimed: false, completed: false },
      { id: '33', type: 'azm', tier: 'Silver III', requirement: 'Achieve 400 active zone minutes', target: 400, icon: '/badges/AZM/AZM_S3.png', stars: 6, coins: 200, claimed: false, completed: false },
      { id: '34', type: 'azm', tier: 'Gold I', requirement: 'Achieve 600 active zone minutes', target: 600, icon: '/badges/AZM/AZM_G1.png', stars: 7, coins: 300, claimed: false, completed: false },
      { id: '35', type: 'azm', tier: 'Gold II', requirement: 'Achieve 800 active zone minutes', target: 800, icon: '/badges/AZM/AZM_G2.png', stars: 8, coins: 500, claimed: false, completed: false },
      { id: '36', type: 'azm', tier: 'Gold III', requirement: 'Achieve 1,000 active zone minutes', target: 1000, icon: '/badges/AZM/AZM_G3.png', stars: 9, coins: 1000, claimed: false, completed: false },
    ],
  },
  {
    category: 'Golddigger 💰',
    badges: [
      { id: '37', type: 'coins', tier: 'Bronze I', requirement: 'Spend 250 coins', target: 250, icon: '/badges/Coins/Coins_B1.png', stars: 1, coins: 10, claimed: false, completed: false },
      { id: '38', type: 'coins', tier: 'Bronze II', requirement: 'Spend 500 coins', target: 500, icon: '/badges/Coins/Coins_B2.png', stars: 2, coins: 25, claimed: false, completed: false },
      { id: '39', type: 'coins', tier: 'Bronze III', requirement: 'Spend 1,000 coins', target: 1000, icon: '/badges/Coins/Coins_B3.png', stars: 3, coins: 50, claimed: false, completed: false },
      { id: '40', type: 'coins', tier: 'Silver I', requirement: 'Spend 2,000 coins', target: 2000, icon: '/badges/Coins/Coins_S1.png', stars: 4, coins: 100, claimed: false, completed: false },
      { id: '41', type: 'coins', tier: 'Silver II', requirement: 'Spend 3,000 coins', target: 3000, icon: '/badges/Coins/Coins_S2.png', stars: 5, coins: 150, claimed: false, completed: false },
      { id: '42', type: 'coins', tier: 'Silver III', requirement: 'Spend 4,000 coins', target: 4000, icon: '/badges/Coins/Coins_S3.png', stars: 6, coins: 200, claimed: false, completed: false },
      { id: '43', type: 'coins', tier: 'Gold I', requirement: 'Spend 5,000 coins', target: 5000, icon: '/badges/Coins/Coins_G1.png', stars: 7, coins: 300, claimed: false, completed: false },
      { id: '44', type: 'coins', tier: 'Gold II', requirement: 'Spend 7,500 coins', target: 7500, icon: '/badges/Coins/Coins_G2.png', stars: 8, coins: 500, claimed: false, completed: false },
      { id: '45', type: 'coins', tier: 'Gold III', requirement: 'Spend 10,000 coins', target: 10000, icon: '/badges/Coins/Coins_G3.png', stars: 9, coins: 1000, claimed: false, completed: false },
    ],
  },
  {
    category: 'Experienced One 🌟',
    badges: [
      { id: '46', type: 'xp', tier: 'Bronze I', requirement: 'Earn 500 XP', target: 500, icon: '/badges/XP/XP_B1.png', stars: 1, coins: 10, claimed: false, completed: false },
      { id: '47', type: 'xp', tier: 'Bronze II', requirement: 'Earn 1,000 XP', target: 1000, icon: '/badges/XP/XP_B2.png', stars: 2, coins: 25, claimed: false, completed: false },
      { id: '48', type: 'xp', tier: 'Bronze III', requirement: 'Earn 2,000 XP', target: 2000, icon: '/badges/XP/XP_B3.png', stars: 3, coins: 50, claimed: false, completed: false },
      { id: '49', type: 'xp', tier: 'Silver I', requirement: 'Earn 3,000 XP', target: 3000, icon: '/badges/XP/XP_S1.png', stars: 4, coins: 100, claimed: false, completed: false },
      { id: '50', type: 'xp', tier: 'Silver II', requirement: 'Earn 4,000 XP', target: 4000, icon: '/badges/XP/XP_S2.png', stars: 5, coins: 150, claimed: false, completed: false },
      { id: '51', type: 'xp', tier: 'Silver III', requirement: 'Earn 5,000 XP', target: 5000, icon: '/badges/XP/XP_S3.png', stars: 6, coins: 200, claimed: false, completed: false },
      { id: '52', type: 'xp', tier: 'Gold I', requirement: 'Earn 7,500 XP', target: 7500, icon: '/badges/XP/XP_G1.png', stars: 7, coins: 300, claimed: false, completed: false },
      { id: '53', type: 'xp', tier: 'Gold II', requirement: 'Earn 10,000 XP', target: 10000, icon: '/badges/XP/XP_G2.png', stars: 8, coins: 500, claimed: false, completed: false },
      { id: '54', type: 'xp', tier: 'Gold III', requirement: 'Earn 12,500 XP', target: 12500, icon: '/badges/XP/XP_G3.png', stars: 9, coins: 1000, claimed: false, completed: false },
    ],
  },
  {
    category: 'Consistent Streaker 📅',
    badges: [
      { id: '55', type: 'streak', tier: 'Bronze I', requirement: 'Maintain a 3-day streak', target: 3, icon: '/badges/Streak/Streak_B1.png', stars: 1, coins: 10, claimed: false, completed: false },
      { id: '56', type: 'streak', tier: 'Bronze II', requirement: 'Maintain a 5-day streak', target: 5, icon: '/badges/Streak/Streak_B2.png', stars: 2, coins: 25, claimed: false, completed: false },
      { id: '57', type: 'streak', tier: 'Bronze III', requirement: 'Maintain a 7-day streak', target: 7, icon: '/badges/Streak/Streak_B3.png', stars: 3, coins: 50, claimed: false, completed: false },
      { id: '58', type: 'streak', tier: 'Silver I', requirement: 'Maintain a 10-day streak', target: 10, icon: '/badges/Streak/Streak_S1.png', stars: 4, coins: 100, claimed: false, completed: false },
      { id: '59', type: 'streak', tier: 'Silver II', requirement: 'Maintain a 14-day streak', target: 14, icon: '/badges/Streak/Streak_S2.png', stars: 5, coins: 150, claimed: false, completed: false },
      { id: '60', type: 'streak', tier: 'Silver III', requirement: 'Maintain a 17-day streak', target: 17, icon: '/badges/Streak/Streak_S3.png', stars: 6, coins: 200, claimed: false, completed: false },
      { id: '61', type: 'streak', tier: 'Gold I', requirement: 'Maintain a 20-day streak', target: 20, icon: '/badges/Streak/Streak_G1.png', stars: 7, coins: 300, claimed: false, completed: false },
      { id: '62', type: 'streak', tier: 'Gold II', requirement: 'Maintain a 25-day streak', target: 25, icon: '/badges/Streak/Streak_G2.png', stars: 8, coins: 500, claimed: false, completed: false },
      { id: '63', type: 'streak', tier: 'Gold III', requirement: 'Maintain a 30-day streak', target: 30, icon: '/badges/Streak/Streak_G3.png', stars: 9, coins: 1000, claimed: false, completed: false },
    ],
  },
  {
    category: 'Completionist 🏆',
    badges: [
      { id: '64', type: 'badges', tier: 'Platinum X', requirement: 'Collect all 63 badges', target: 63, icon: '/badges/Platinum.png', stars: 10, xp: 5000, coins: 10000, claimed: false, completed: false },
    ],
  },
]
