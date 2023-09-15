/*
This file is part of the Notesnook project (https://notesnook.com/)

Copyright (C) 2023 Streetwriters (Private) Limited

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import { useThemeColors } from "@notesnook/theme";
import React from "react";
import { ColorValue, GestureResponderEvent, TextStyle } from "react-native";
import Animated, { Layout } from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { RGB_Linear_Shade, hexToRGBA } from "../../../utils/colors";
import { SIZE } from "../../../utils/size";
import NativeTooltip from "../../../utils/tooltip";
import { PressableButton, PressableButtonProps } from "../pressable";
interface IconButtonProps extends PressableButtonProps {
  name: string;
  color?: ColorValue;
  size?: number;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  disabled?: boolean;
  tooltipText?: string;
  tooltipPosition?: number;
  iconStyle?: TextStyle;
}

const AnimatedIcon = Animated.createAnimatedComponent(Icon);
export const IconButton = ({
  onPress,
  name,
  color,
  customStyle,
  size = SIZE.xxl,
  iconStyle = {},
  left = 10,
  right = 10,
  top = 30,
  bottom = 10,
  onLongPress,
  tooltipText,
  type = "gray",
  fwdRef,
  tooltipPosition = NativeTooltip.POSITIONS.TOP,
  ...restProps
}: IconButtonProps) => {
  const { colors } = useThemeColors();

  const _onLongPress = (event: GestureResponderEvent) => {
    if (onLongPress) {
      onLongPress(event);
      return;
    }
    if (tooltipText) {
      NativeTooltip.show(event, tooltipText, tooltipPosition);
    }
  };

  return (
    <PressableButton
      {...restProps}
      fwdRef={fwdRef}
      onPress={onPress}
      hitSlop={{ top: top, left: left, right: right, bottom: bottom }}
      onLongPress={_onLongPress}
      type={type}
      customStyle={{
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        ...customStyle
      }}
    >
      <AnimatedIcon
        layout={Layout}
        name={name}
        style={iconStyle as any}
        allowFontScaling
        color={
          restProps.disabled
            ? RGB_Linear_Shade(-0.05, hexToRGBA(colors.secondary.background))
            : colors.static[color as never] || color
        }
        size={size}
      />
    </PressableButton>
  );
};
