//@flow

import React, { Component } from "react";
import {
  ActivityIndicator,
  Text,
  TouchableHighlight,
  View,
  TouchableOpacity
} from "react-native";

export function loaderDialog(header, onCancel) {
  return (
    <View style={{ backgroundColor: "#fff", padding: 24 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <ActivityIndicator />
        <Text style={{ fontSize: 18, paddingHorizontal: 12 }}>{header}</Text>
      </View>
      {onCancel && (
        <TouchableHighlight
          style={{
            backgroundColor: "#f50057",
            marginVertical: 12,
            padding: 16
          }}
          onPress={() => {
            onCancel();
          }}
        >
          <Text style={{ textAlign: "center", color: "#fff" }}>Cancel</Text>
        </TouchableHighlight>
      )}
    </View>
  );
}

export function actionDialog(header, description, onDone, onCancel) {
  return (
    <View style={{ backgroundColor: "#fff", padding: 24 }}>
      <Text style={{ fontSize: 24 }}>{header}</Text>
      <Text style={{ fontSize: 16 }}>{description}</Text>
      <View style={{ flexDirection: "row" }}>
        {onDone && (
          <TouchableHighlight
            underlayColor={"#355C9555"}
            style={{
              backgroundColor: "#fff",
              marginVertical: 12,
              borderRadius: 24,
              padding: 12,
              flex: 1
            }}
            onPress={onDone}
          >
            <Text style={{ textAlign: "center", color: "#3853A4" }}>Yes</Text>
          </TouchableHighlight>
        )}
        {onCancel && (
          <TouchableOpacity
            activeOpacity={0.9}
            style={{
              backgroundColor: "#3853A4",
              padding: 12,
              borderRadius: 24,
              flexDirection: "row",
              marginVertical: 12,
              flex: 1
            }}
            onPress={onCancel}
          >
            <Text style={{ textAlign: "center", color: "#fff", flex: 1 }}>
              {"No"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
