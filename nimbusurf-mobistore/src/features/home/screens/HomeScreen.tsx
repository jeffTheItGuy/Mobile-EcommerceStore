import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES } from "../../../constants";
import {
  useHomeData,
  type HomeProduct,
} from "../hooks/useHomeData";
import TrendingSection from "../components/TrendingSection";
import TrendingClothesSection from "../components/TrendingClothesSection";
import RecentlyViewedSection from "../components/RecentlyViewedSection";

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const {
    trending,
    trendingClothes,
    recentlyViewed,
    isLoading,
    error,
    refetch,
  } = useHomeData();

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const openProduct = useCallback(
    (item: HomeProduct) => {
      navigation.navigate("Product", {
        id: item.id,
        name: item.name,
        img: item.img,
        type: item.type ?? "women",
        price: item.price ?? 0,
      });
    },
    [navigation]
  );

  const showInitialLoader =
    isLoading &&
    trendingClothes.length === 0 &&
    recentlyViewed.length === 0;

  if (showInitialLoader) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.black} />
        <Text style={styles.loadingText}>Loading Nimbusurf Store...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={[COLORS.black]}
        />
      }
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nimbusurf Store</Text>
        <Text style={styles.headerSubtitle}>
          Discover premium fashion drops
        </Text>
      </View>

      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      <TrendingSection data={trending} />
      <TrendingClothesSection
        data={trendingClothes}
        onPressItem={openProduct}
      />
      <RecentlyViewedSection
        data={recentlyViewed}
        onPressItem={openProduct}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  content: {
    paddingBottom: SIZES.padding * 2,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8FAFC",
    gap: 12,
    padding: SIZES.padding,
  },
  loadingText: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "600",
  },
  header: {
    paddingTop: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    paddingBottom: SIZES.base,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: COLORS.black,
  },
  headerSubtitle: {
    marginTop: 6,
    fontSize: 15,
    color: "#64748B",
  },
  errorBox: {
    marginHorizontal: SIZES.padding,
    marginTop: SIZES.base,
    borderRadius: 14,
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    padding: SIZES.base,
  },
  errorText: {
    color: "#B91C1C",
    fontSize: 13,
    fontWeight: "600",
  },
});
