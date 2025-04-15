import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { icons } from "@/constants/icons";

interface VideoCardProps {
  title: string;
  creator: { username: string; avatar: string };
  thumbnail: string;
  video: string;
}

const VideoCard = ({ title, creator, thumbnail, video }: VideoCardProps) => {

  const player = useVideoPlayer({ uri: video }, (player) => {
    player.loop = true;
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: creator.avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {creator.username}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image source={icons.menu} className="size-5" resizeMode="contain" />
        </View>
      </View>

      <View className="w-full h-60 mt-3 rounded-xl">
        {isPlaying ? (
          <VideoView
            style={styles.video}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
            contentFit="fill"
          />
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              if (isPlaying) {
                player.pause();
              } else {
                player.play();
              }
            }}
            className="w-full h-60 relative flex justify-center items-center"
          >
            <Image
              source={{ uri: thumbnail }}
              className="w-full h-full rounded-xl"
              resizeMode="cover"
            />
            <Image
              source={icons.play}
              className="w-12 h-12 absolute"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
});

export default VideoCard;
