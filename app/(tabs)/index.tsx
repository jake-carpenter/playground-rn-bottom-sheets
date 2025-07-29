import { Stack } from 'expo-router'

import { StyleSheet, Text, View } from 'react-native'

import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet'
import { useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Button } from '~/components/Button'
import { ScreenContent } from '~/components/ScreenContent'

export default function Home() {
  const [visible, setVisible] = useState(false)

  return (
    <GestureHandlerRootView>
      <Stack.Screen options={{ title: 'Tab One' }} />
      <View style={styles.container}>
        <ScreenContent path="app/(tabs)/index.tsx" title="Tab One" />
        <Button title="Open bottom sheet" onPress={() => setVisible(true)} />
      </View>
      {visible && (
        <BottomSheet
          snapPoints={['50%', '90%']}
          enableDynamicSizing={false}
          index={0}
          backdropComponent={BottomSheetBackdrop}
          onClose={() => setVisible(false)}
          enablePanDownToClose>
          <BottomSheetView style={styles.container}>
            <Text>Hello, World!</Text>
          </BottomSheetView>
        </BottomSheet>
      )}
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
})
