import { icons } from "@/constants/icons";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import * as Animatable from "react-native-animatable";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};

const zoomOut = {
  0: {
    scale: 1.1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }: any) => {
  const player = useVideoPlayer({ uri: item.video }, (player) => {
    player.loop = true;
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={700}
      easing="ease-out"
    >
      <View className="w-52 h-72 mt-3 rounded-xl">
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
            className="w-52 h-72 relative flex justify-center items-center"
          >
            <ImageBackground
              source={{ uri: item.thumbnail }}
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
    </Animatable.View>
  );
};

const Trending = ({ posts }: any) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanged = ({ viewableItems }: { viewableItems: Array<{ key: string }> }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      horizontal
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
    />
  );
};

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
});

export default Trending;
