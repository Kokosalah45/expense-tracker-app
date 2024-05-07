import { StyleSheet, Text, View } from "react-native";
import Onboarding, { Page } from "react-native-onboarding-swiper";

import React, { useState } from "react";
import LanguagePicker from "@/common/features/LanguagePicker";

const pages: Page[] = [
  {
    backgroundColor: "purple",
    image: <LanguagePicker />,
    title: "Onboarding",
    subtitle: "Done with React Native Onboarding Swiper",
  },
  {
    backgroundColor: "purple",
    image: (
      <View>
        <Text>first screen</Text>
      </View>
    ),
    title: "Onboarding",
    subtitle: "Done with React Native Onboarding Swiper",
  },
  {
    backgroundColor: "purple",
    image: (
      <View>
        <Text>first screen</Text>
      </View>
    ),
    title: "Onboarding",
    subtitle: "Done with React Native Onboarding Swiper",
  },
];

const getPosition = (
  index: number,
  pagesLength: number
): "start" | "between" | "end" => {
  if (index === 0) return "start";
  if (index === pagesLength - 1) return "end";
  return "between";
};

type Props = {
  setOnboardingComplete: () => void;
};

const OnBoardingScreen = ({ setOnboardingComplete }: Props) => {
  const [index, setIndex] = useState(0);

  const position = getPosition(index, pages.length);

  return (
    <Onboarding
      showNext={false}
      showSkip={position === "between"}
      pageIndexCallback={(index) => setIndex(index)}
      showDone={position === "end"}
      onDone={setOnboardingComplete}
      onSkip={setOnboardingComplete}
      pages={pages}
    />
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({});
