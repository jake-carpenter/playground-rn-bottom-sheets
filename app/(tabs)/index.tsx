import { Stack } from 'expo-router'

import { StyleSheet, Text, View } from 'react-native'

import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { createRef } from 'react'
import { Button } from '~/components/Button'
import { ScreenContent } from '~/components/ScreenContent'

export default function Home() {
  const bottomSheetModalRef = createRef<BottomSheetModal>()

  return (
    <>
      <Stack.Screen options={{ title: 'Tab One' }} />
      <View style={styles.container}>
        <ScreenContent path="app/(tabs)/index.tsx" title="Tab One" />
        <Button title="Open bottom sheet" onPress={() => bottomSheetModalRef.current?.present()} />
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={['50%']}
        enableDynamicSizing={false}
        index={0}
        backdropComponent={AdjustedBackdrop}
        enablePanDownToClose>
        <BottomSheetView style={styles.container}>
          <Text>Hello, World!</Text>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
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
