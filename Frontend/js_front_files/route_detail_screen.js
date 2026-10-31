import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import BusInfoCard from './bus_info_card';

const SAMPLE_ROUTE_DETAILS = {
  1: {
    id: 1,
    title: 'QC Hall to Cubao',
    color: '#DE3B32',
    mapImage: null,
    journeys: [
      {
        directionTitle: 'QC Hall to Cubao',
        stops: [
          'QUEZON CITY HALL GATE 3 KALAYAAN AVE.',
          'KALAYAAN AVE. COR. MASIGLA ST.',
          'KALAYAAN AVE. COR. KAMIAS RD. INTERCHANGE',
          'BARANGAY SILANGAN HALL',
          '15TH AVE. COR. AURORA BLVD.',
          'CUBAO (ARANETA CITY)',
        ],
      },
      {
        directionTitle: 'Cubao to QC Hall',
        stops: [
          'CUBAO (ARANETA CITY)',
          'BARANGAY SILANGAN HALL',
          'KALAYAAN AVE. COR. KAMIAS RD. INTERCHANGE',
          'KALAYAAN AVE. COR. MASIGLA ST.',
          'QUEZON CITY HALL GATE 3 KALAYAAN AVE.',
        ],
      },
    ],
  },
};

export default function RouteDetailScreen({ route, navigation, selectedRoute, onBack }) {
  const [selectedBus, setSelectedBus] = useState(null);

  const passedRoute = route?.params?.route || selectedRoute || {
    id: 1,
    title: 'QC Hall to Cubao',
    color: '#DE3B32',
  };

  const cleanTitle = passedRoute.title.replace('\n', ' ');
  const themeColor = passedRoute.color || '#DE3B32';

  const detailData = SAMPLE_ROUTE_DETAILS[passedRoute.id] || {
    ...passedRoute,
    journeys: [
      {
        directionTitle: cleanTitle,
        stops: ['ORIGIN TERMINAL', 'INTERMEDIATE STOP 1', 'DESTINATION TERMINAL'],
      },
    ],
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation?.canGoBack()) {
      navigation.goBack();
    }
  };

  // Simulates tapping a bus icon on the map
  const handleSimulateBusTap = () => {
    setSelectedBus({
      plateTitle: 'Plate Number',
      isActive: true,
      eta: '20 min',
      plate: 'Plate Number',
      maxCapacity: 50,
      agency: 'Quezon City (Q City) Bus',
      position: '41.414231324145',
      heading: 123,
      updatedAt: '2026-10-31 15:21',
      gpsId: 'asdasd45421',
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar style="light" backgroundColor="#16439C" translucent={false} />

      {/* 1. Top Blue Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Text style={styles.backArrow}>←</Text>
          <Text style={styles.backText}>All routes</Text>
        </TouchableOpacity>

        <View style={styles.routeHeaderCard}>
          <View style={[styles.routeBadge, { backgroundColor: themeColor }]}>
            <Text style={styles.routeBadgeLabel}>ROUTE</Text>
            <Text style={styles.routeBadgeNumber}>{passedRoute.id}</Text>
          </View>
          <Text style={[styles.routeHeaderTitle, { color: themeColor }]}>
            {cleanTitle}
          </Text>
        </View>
      </View>

      {/* 2. Main Scrollable Content */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Map Section (Tap the placeholder box to test BusInfoCard!) */}
        <View style={styles.mapWrapper}>
          {detailData.mapImage ? (
            <Image
              source={detailData.mapImage}
              style={styles.mapImage}
              resizeMode="cover"
            />
          ) : (
            <TouchableOpacity
              style={styles.mapPlaceholder}
              onPress={handleSimulateBusTap}
              activeOpacity={0.8}
            >
              <Text style={styles.mapPlaceholderIcon}>🚌</Text>
              <Text style={styles.mapPlaceholderText}>
                Route {passedRoute.id} Map View
              </Text>
              <Text style={styles.mapPlaceholderSub}>
                (Tap here to simulate clicking a bus on the map)
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* --- SWAP STARTS RIGHT HERE (UNDER MAPWRAPPER'S </View>) --- */}
        {selectedBus ? (
          <BusInfoCard
            bus={selectedBus}
            onClose={() => setSelectedBus(null)}
          />
        ) : (
          <>
            <Text style={styles.journeyMainTitle}>Route journey</Text>

            {detailData.journeys.map((journey, jIndex) => (
              <View key={jIndex} style={styles.journeyBlock}>
                <Text style={[styles.directionTitle, { color: themeColor }]}>
                  {journey.directionTitle}
                </Text>

                <View style={styles.timelineContainer}>
                  {journey.stops.map((stop, sIndex) => {
                    const isFirst = sIndex === 0;
                    const isLast = sIndex === journey.stops.length - 1;

                    return (
                      <View key={sIndex} style={styles.stopRow}>
                        <View style={styles.timelineColumn}>
                          <View
                            style={[
                              styles.verticalLine,
                              { backgroundColor: isFirst ? 'transparent' : themeColor },
                            ]}
                          />
                          <View
                            style={[
                              styles.stopDot,
                              { borderColor: themeColor },
                              isFirst && styles.firstStopDot,
                              isLast && { backgroundColor: themeColor },
                            ]}
                          />
                          <View
                            style={[
                              styles.verticalLine,
                              { backgroundColor: isLast ? 'transparent' : themeColor },
                            ]}
                          />
                        </View>

                        <Text style={styles.stopText}>{stop}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            ))}
          </>
        )}
        {/* --- SWAP ENDS RIGHT HERE (ABOVE </ScrollView>) --- */}
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
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#16439C',
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    alignSelf: 'flex-start',
  },
  backArrow: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginRight: 6,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 14.5,
    fontWeight: '700',
  },
  routeHeaderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    maxWidth: '100%',
  },
  routeBadge: {
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  routeBadgeLabel: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  routeBadgeNumber: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 22,
  },
  routeHeaderTitle: {
    fontSize: 19,
    fontWeight: '800',
    flexShrink: 1,
    paddingRight: 4,
  },
  contentContainer: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 36,
  },
  mapWrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },
  mapImage: {
    width: '88%',
    height: 250,
    borderRadius: 4,
  },
  mapPlaceholder: {
    width: '88%',
    height: 240,
    backgroundColor: '#EAEAEA',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  mapPlaceholderIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  mapPlaceholderText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333333',
  },
  mapPlaceholderSub: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    marginTop: 4,
  },
  journeyMainTitle: {
    color: '#1A3567',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
  },
  journeyBlock: {
    marginBottom: 24,
  },
  directionTitle: {
    fontSize: 15.5,
    fontWeight: '700',
    marginBottom: 10,
  },
  timelineContainer: {
    paddingLeft: 2,
  },
  stopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 28,
  },
  timelineColumn: {
    width: 20,
    alignItems: 'center',
    alignSelf: 'stretch',
    marginRight: 10,
  },
  verticalLine: {
    width: 1.5,
    flex: 1,
  },
  stopDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1.5,
    backgroundColor: '#FFFFFF',
  },
  firstStopDot: {
    backgroundColor: '#5CE62E',
    borderColor: '#4A7A3A',
  },
  stopText: {
    flex: 1,
    color: '#4A4A4A',
    fontSize: 11.5,
    fontWeight: '800',
    letterSpacing: 0.2,
    paddingVertical: 5,
  },
});
