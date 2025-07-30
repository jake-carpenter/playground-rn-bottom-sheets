import { Stack } from 'expo-router'

import { StyleSheet, Text, View } from 'react-native'

import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
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
        snapPoints={['25%', '50%', '75%']}
        enableDynamicSizing={false}
        index={1}
        backdropComponent={BottomSheetBackdrop}
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
