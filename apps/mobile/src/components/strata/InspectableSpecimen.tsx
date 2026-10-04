import { type ComponentProps } from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { Specimen } from "./Specimen";
import { MotionPressable } from "./MotionPressable";
interface InspectableSpecimenProps extends ComponentProps<typeof Specimen> {
  identityId?: string | null;
  date?: string;
  interactive?: boolean;
}
export function InspectableSpecimen({
  identityId,
  date,
  interactive = true,
  ...props
}: InspectableSpecimenProps) {
  const available = interactive && props.records?.some((r) => r.minutes > 0);
  const open = (id?: string) => {
    void Haptics.selectionAsync().catch(() => {});
    router.push({
      pathname: "/modals/layer",
      params: { id, identityId: identityId ?? undefined, date },
    });
  };
  return (
    <View>
      <Specimen {...props} onSelectLayer={available ? open : undefined} />
      {available && (
        <MotionPressable
          accessibilityRole="button"
          accessibilityLabel="Inspect recorded layers"
          onPress={() => open()}
          className="min-h-[44px] justify-center"
        >
          <Text className="text-[13px] text-accent dark:text-dark-accent">
            Inspect layers
          </Text>
        </MotionPressable>
      )}
    </View>
  );
}
