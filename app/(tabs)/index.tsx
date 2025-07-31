import { Stack } from 'expo-router'

import { StyleSheet, Text, View } from 'react-native'

import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetBackgroundProps,
  BottomSheetFooter,
  BottomSheetFooterProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { createRef } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button } from '~/components/Button'
import { ScreenContent } from '~/components/ScreenContent'

export default function Home() {
  const bottomSheetModalRef = createRef<BottomSheetModal>()
  const { bottom } = useSafeAreaInsets()

  return (
    <>
      <Stack.Screen options={{ title: 'Tab One' }} />
      <View style={styles.container}>
        <ScreenContent path="app/(tabs)/index.tsx" title="Tab One" />
        <Button title="Open bottom sheet" onPress={() => bottomSheetModalRef.current?.present()} />
      </View>
      <BottomSheetModal // Adding bottom inset on this just moves this whole thing up
        enablePanDownToClose
        ref={bottomSheetModalRef}
        backgroundComponent={AdjustedBackground}
        backdropComponent={AdjustedBackdrop}>
        <BottomSheetView
          style={[styles.container, { backgroundColor: 'green', paddingBottom: bottom }]}>
          <Text>Hello, World!</Text>
          <Button title="I'm a button" onPress={() => bottomSheetModalRef.current?.dismiss()} />
        </BottomSheetView>
      </BottomSheetModal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
})

// This is necessary to ensure the backdrop is rendered in a sane way.
function AdjustedBackdrop(props: BottomSheetBackdropProps) {
  return (
    <BottomSheetBackdrop
      opacity={0.5}
      style={{ opacity: 0.5 }}
      animatedIndex={props.animatedIndex}
      animatedPosition={props.animatedPosition}
      // Default is 1 for some reason. Not sure why I wouldn't want backdrop to appear on the first index by default
      appearsOnIndex={0}
      // Default is 0 and -1 will make it disappear when the sheet is closed.
      disappearsOnIndex={-1}
    />
  )
}

// Example footer, but it just sits in front of the sheet content. BottomSheetView would have to
// compensate for the size.
function AdjustedFooter(props: BottomSheetFooterProps) {
  const { bottom } = useSafeAreaInsets()
  return (
    <BottomSheetFooter {...props} style={{ backgroundColor: 'red' }} bottomInset={bottom}>
      <Text>Custom Footer</Text>
    </BottomSheetFooter>
  )
}

function AdjustedBackground(props: BottomSheetBackgroundProps) {
  return <View style={[props.style, { backgroundColor: 'blue' }]} />
}
