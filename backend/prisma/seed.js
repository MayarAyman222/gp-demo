import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const icons = [
    // ====== BASIC NEEDS ======
    { title: "Eating", expression: "I want to eat", iconName: "utensils" },
    { title: "Drinking", expression: "I want to drink water", iconName: "coffee" },
    { title: "Sleeping", expression: "I want to sleep", iconName: "bed" },
    { title: "Toilet", expression: "I need to go to the toilet", iconName: "toilet" },
    { title: "Shower", expression: "I want to take a shower", iconName: "shower" },
    { title: "Brush Teeth", expression: "I need to brush my teeth", iconName: "tooth" },
    { title: "Get Dressed", expression: "I want to get dressed", iconName: "tshirt" },
    { title: "Wash Hands", expression: "I need to wash my hands", iconName: "hands-wash" },
    { title: "Medicine", expression: "I need my medicine", iconName: "pills" },
    { title: "Doctor", expression: "I need to see a doctor", iconName: "user-doctor" },

    // ====== FEELINGS ======
    { title: "Happy", expression: "I feel happy", iconName: "face-smile" },
    { title: "Sad", expression: "I feel sad", iconName: "face-frown" },
    { title: "Angry", expression: "I feel angry", iconName: "face-angry" },
    { title: "Tired", expression: "I feel tired", iconName: "bed" },
    { title: "Pain", expression: "I am in pain", iconName: "face-sad-tear" },
    { title: "Scared", expression: "I feel scared", iconName: "face-frown-open" },
    { title: "Help", expression: "I need help", iconName: "hands-raised" },

    // ====== COMMUNICATION ======
    { title: "Yes", expression: "Yes, please", iconName: "check" },
    { title: "No", expression: "No, thank you", iconName: "times" },
    { title: "Call", expression: "I want to make a phone call", iconName: "phone" },
    { title: "Talk", expression: "I want to talk", iconName: "comment" },
    { title: "Listen", expression: "I want to listen", iconName: "ear" },

    // ====== DAILY LIFE ======
    { title: "Breakfast", expression: "I want breakfast", iconName: "bowl-food" },
    { title: "Lunch", expression: "I want lunch", iconName: "bowl-rice" },
    { title: "Dinner", expression: "I want dinner", iconName: "plate-utensils" },
    { title: "Snack", expression: "I want a snack", iconName: "cookie" },
    { title: "TV", expression: "I want to watch TV", iconName: "tv" },
    { title: "Play", expression: "I want to play", iconName: "gamepad" },
    { title: "Music", expression: "I want to listen to music", iconName: "music" },
    { title: "Read", expression: "I want to read a book", iconName: "book" },
    { title: "Phone", expression: "I want to use the phone", iconName: "phone" },
    { title: "Home", expression: "I want to go home", iconName: "house" },

    // ====== ADDITIONAL 30 ICONS ======
    { title: "Walk", expression: "I want to go for a walk", iconName: "shoe-prints" },
    { title: "Run", expression: "I want to go for a run", iconName: "running" },
    { title: "Bike", expression: "I want to ride a bike", iconName: "bicycle" },
    { title: "Car", expression: "I want to drive a car", iconName: "car" },
    { title: "Bus", expression: "I want to take the bus", iconName: "bus" },
    { title: "Train", expression: "I want to take the train", iconName: "train" },
    { title: "Plane", expression: "I want to fly", iconName: "plane" },
    { title: "Shopping", expression: "I want to go shopping", iconName: "shopping-cart" },
    { title: "Coffee", expression: "I want coffee", iconName: "mug-saucer" },
    { title: "Tea", expression: "I want tea", iconName: "coffee-togo" },
    { title: "Book", expression: "I want to read a book", iconName: "book-open" },
    { title: "Phone Call", expression: "I want to make a phone call", iconName: "phone-alt" },
    { title: "Internet", expression: "I want to use the internet", iconName: "wifi" },
    { title: "Sleepy", expression: "I feel sleepy", iconName: "bed" },
    { title: "Excited", expression: "I feel excited", iconName: "grin-stars" },
    { title: "Bored", expression: "I feel bored", iconName: "meh" },
    { title: "Cold", expression: "I feel cold", iconName: "temperature-low" },
    { title: "Hot", expression: "I feel hot", iconName: "temperature-high" },
    { title: "Hungry", expression: "I feel hungry", iconName: "utensils" },
    { title: "Thirsty", expression: "I feel thirsty", iconName: "glass-water" },
    { title: "Computer", expression: "I want to use a computer", iconName: "laptop" },
    { title: "Music Player", expression: "I want to listen to music", iconName: "compact-disc" },
    { title: "Camera", expression: "I want to take a photo", iconName: "camera" },
    { title: "Video", expression: "I want to watch a video", iconName: "video" },
    { title: "Game", expression: "I want to play a game", iconName: "gamepad" },
    { title: "Friend", expression: "I want to see my friend", iconName: "user-friends" },
    { title: "Family", expression: "I want to see my family", iconName: "users" },
    { title: "Pet", expression: "I want to play with my pet", iconName: "paw" },
    { title: "Relax", expression: "I want to relax", iconName: "spa" },
  ];

  await prisma.icon.createMany({
    data: icons,
    skipDuplicates: true,
  });

  console.log("✅ Icons added successfully!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
