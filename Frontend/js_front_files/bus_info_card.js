import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BusInfoCard({ bus, onClose }) {
  const [showMore, setShowMore] = useState(true);

  if (!bus) return null;

  return (
    <View style={styles.card}>
      {/* Top Row: Plate Title + Close Button */}
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.plateTitle}>{bus.plateTitle || 'Plate Number'}</Text>
          <View style={styles.statusRow}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: bus.isActive ? '#39CC33' : '#999999' },
              ]}
            />
            <Text
              style={[
                styles.statusText,
                { color: bus.isActive ? '#39CC33' : '#999999' },
              ]}
            >
              {bus.isActive ? 'Active' : 'Inactive'}
            </Text>
          </View>
        </View>

        {onClose && (
          <TouchableOpacity onPress={onClose} hitSlop={10}>
            <Text style={styles.closeBtn}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Yellow ETA Box */}
      <View style={styles.etaBox}>
        <Text style={styles.etaLabel}>Estimated arrival at...</Text>
        <Text style={styles.etaValue}>{bus.eta}</Text>
      </View>

      {/* Primary Bus Info */}
      <View style={styles.infoSection}>
        <InfoRow label="Plate" value={bus.plate} />
        <InfoRow label="Max. Capacity" value={String(bus.maxCapacity)} />
        <InfoRow label="Agency" value={bus.agency} />
        <InfoRow label="Position" value={bus.position} />
      </View>

      {/* Expandable More Details */}
      <TouchableOpacity
        style={styles.moreToggle}
        onPress={() => setShowMore(!showMore)}
        activeOpacity={0.7}
      >
        <Text style={styles.chevron}>{showMore ? '⌄' : '›'}</Text>
        <Text style={styles.moreToggleText}>More Details</Text>
      </TouchableOpacity>

      {showMore && (
        <View style={styles.infoSection}>
          <InfoRow label="Heading" value={String(bus.heading)} />
          <InfoRow label="Updated at" value={bus.updatedAt} />
          <InfoRow label="GPS ID" value={bus.gpsId} />
        </View>
      )}
    </View>
  );
}

function InfoRow({ label, value }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 10,
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  plateTitle: {
    color: '#1F3A6E',
    fontSize: 20,
    fontWeight: '800',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5,
  },
  statusText: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  closeBtn: {
    fontSize: 16,
    color: '#888888',
    fontWeight: '700',
    padding: 4,
  },
  etaBox: {
    backgroundColor: '#FFF7CE',
    borderWidth: 1,
    borderColor: '#7A7455',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 18,
  },
  etaLabel: {
    color: '#4F4A38',
    fontSize: 13.5,
    marginBottom: 4,
  },
  etaValue: {
    color: '#1A2D4C',
    fontSize: 30,
    fontWeight: '800',
  },
  infoSection: {
    paddingHorizontal: 4,
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    width: '42%',
    fontSize: 11.5,
    color: '#333333',
    fontWeight: '500',
  },
  infoValue: {
    flex: 1,
    fontSize: 11.5,
    color: '#333333',
    fontWeight: '500',
  },
  moreToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  chevron: {
    color: '#1F3A6E',
    fontSize: 14,
    fontWeight: '800',
    marginRight: 6,
    lineHeight: 16,
  },
  moreToggleText: {
    color: '#1F3A6E',
    fontSize: 13,
    fontWeight: '700',
  },
});
