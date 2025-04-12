interface CreateUserParams {
  email: string;
  password: string;
  username: string;
}

interface User {
  accountId: string;
  email: string;
  username: string;
  avatar: string;
}

interface Video {
  $id: string;
  title: string;
  prompt: string;
  thumbnail: string;
  video: string;
  creator: User;
}
