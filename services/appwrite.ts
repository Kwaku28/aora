import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const USER_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID!;
const VIDEO_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_VIDEO_COLLECTION_ID!;
const VIDEO_BUCKET_ID = process.env.EXPO_PUBLIC_APPWRITE_STORAGE_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!);

const databases = new Databases(client);
const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);

export async function createUser(
  user: CreateUserParams
) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.username
    );

    if (!newAccount) throw new Error("Failed to create account.");

    const avatarUrl = avatars.getInitials(user.username);

    await signIn(user.email, user.password);

    const newUser = await databases.createDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: user.email,
        username: user.username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log("Error creating user:", error);
    throw new Error(typeof error === "string" ? error : JSON.stringify(error));
  }
}

export async function signIn(email: string, password: string) {
  try {
    // const sessions = await account.getSession("current");

    // if (sessions) {
    //   await account.deleteSessions();
    // }

    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    console.log("Error signing in:", error);
    throw new Error(typeof error === "string" ? error : JSON.stringify(error));
  }
}

export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    console.log("Error getting account:", error);
    throw new Error(typeof error === "string" ? error : JSON.stringify(error));
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      DATABASE_ID,
      USER_COLLECTION_ID,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const getAllPosts = async (): Promise<Video[] | undefined> => {
  try {
    const posts = await databases.listDocuments(
      DATABASE_ID,
      VIDEO_COLLECTION_ID,
      [Query.limit(100)]
    );

    return posts.documents as unknown as Video[];
  } catch (error) {
    console.log("Error getting all posts:", error);
    throw new Error(typeof error === "string" ? error : JSON.stringify(error));
  }
}

export const getLatestPosts = async (): Promise<Video[] | undefined> => {
  try {
    const posts = await databases.listDocuments(
      DATABASE_ID,
      VIDEO_COLLECTION_ID,
      [Query.limit(10), Query.orderDesc("$createdAt")]
    );

    return posts.documents as unknown as Video[];
  } catch (error) {
    console.log("Error getting latest posts:", error);
    throw new Error(typeof error === "string" ? error : JSON.stringify(error));
  }
}
