import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const ROUTES = [
  { id: 1, title: 'QC Hall to Cubao', color: '#DE3B32' },
  { id: 2, title: 'QC Hall to Litex', color: '#FF479D' },
  { id: 3, title: 'Welcome Rotonda to\nAurora Katipunan', color: '#FFDA47' },
  { id: 4, title: 'QC Hall to Gen Luis', color: '#992BE6' },
  { id: 5, title: 'QC Hall to Mindanao Ave.\nvia Visayas Ave.', color: '#FFA74F' },
  { id: 6, title: 'QC Hall to Gilmore', color: '#0EBD0E' },
  { id: 7, title: 'QC Hall to C5 / Ortigas\nAve. Ext.', color: '#4B77B5' },
  { id: 8, title: 'QC Hall to Muñoz', color: '#38B6FF' },
];

export default function HomeScreen({ onSelectRoute }) {
  const handlePress = (route) => {
    if (onSelectRoute) {
      onSelectRoute(route);
    } else {
      console.log(`Selected Route ${route.id}: ${route.title}`);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar style="light" backgroundColor="#16439C" translucent={false} />

      {/* Top Blue Header */}
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          {/* Q CityBus Logo Badge */}
          <View style={styles.logoBox}>
            <View style={styles.qCircle}>
              <Text style={styles.qText}>Q</Text>
            </View>
            <Text style={styles.logoSubtext}>CITYBUS</Text>
          </View>

          {/* Red Title Pill */}
          <View style={styles.headerBanner}>
            <Text style={styles.headerBannerText}>Quezon City Bus Routes</Text>
          </View>
        </View>

        <Text style={styles.headerSubtitle}>Choose your route.</Text>
      </View>

      {/* Main Content */}
        <ScrollView style={styles.scroll} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Bus routes</Text>
        <Text style={styles.sectionSubtitle}>Pick your destination.</Text>

        {/* Route Cards */}
        <View style={styles.routeList}>
          {ROUTES.map((route) => (
            <TouchableOpacity
              key={route.id}
              activeOpacity={0.85}
              style={[styles.routeCard, { backgroundColor: route.color }]}
              onPress={() => handlePress(route)}
            >
              {/* Left White Badge */}
              <View style={styles.routeBadge}>
                <Text style={[styles.routeBadgeLabel, { color: route.color }]}>
                  ROUTE
                </Text>
                <Text style={[styles.routeBadgeNumber, { color: route.color }]}>
                  {route.id}
                </Text>
              </View>

              {/* Destination Text */}
              <Text style={styles.routeTitle}>{route.title}</Text>

              {/* Right Arrow */}
              <Text style={styles.arrowIcon}>→</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#16439C',
  },
  scroll: {
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#16439C',
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 18,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoBox: {
    width: 48,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    paddingVertical: 2,
  },
  qCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#DE3B32',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 18,
  },
  logoSubtext: {
    color: '#111111',
    fontSize: 7.5,
    fontWeight: '800',
    marginTop: 2,
    letterSpacing: 0.3,
  },
  headerBanner: {
    flex: 1,
    backgroundColor: '#DE3B32',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  headerBannerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  headerSubtitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '700',
    paddingLeft: 4,
  },
  contentContainer: {
    paddingHorizontal: 14,
    paddingTop: 18,
    paddingBottom: 28,
  },
  sectionTitle: {
    color: '#184494',
    fontSize: 21,
    fontWeight: '800',
  },
  sectionSubtitle: {
    color: '#184494',
    fontSize: 12.5,
    fontWeight: '600',
    marginTop: 2,
    marginBottom: 14,
  },
  routeList: {
    gap: 10,
  },
  routeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 68,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.25)',
  },
  routeBadge: {
    width: 48,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  routeBadgeLabel: {
    fontSize: 9.5,
    fontWeight: '800',
  },
  routeBadgeNumber: {
    fontSize: 21,
    fontWeight: '900',
    lineHeight: 23,
  },
  routeTitle: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 17.5,
    fontWeight: '800',
    lineHeight: 22,
  },
  arrowIcon: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    marginLeft: 8,
  },
});

