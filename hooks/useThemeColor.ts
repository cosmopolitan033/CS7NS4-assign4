import useColorScheme from './useColorScheme';

export default function useThemeColor(lightColor: string, darkColor: string): string {
    const theme = useColorScheme();
    return theme === 'dark' ? darkColor : lightColor;
}
