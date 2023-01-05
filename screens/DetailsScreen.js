import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet, StatusBar as sb, useColorScheme, Dimensions } from "react-native"
// import Constants from "expo-constants"
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from "react-i18next"
import { lightStyles } from "../styling/themeselctor"
import { darkStyles } from "../styling/themeselctor"


import i18n from "../i18n"


const API_KEY = '92da371712034b24b992184403add809'
const API_URL = `https://newsapi.org/v2/everything?q=news&apiKey=${API_KEY}`

export default function DetailsScreen({ route }) {
  const { t } = useTranslation()
  let { url } = route.params
  const { isLoading, isError, data: news, error } = useQuery(['news'], fetchNews)

  const colorScheme = useColorScheme()
  const styles = colorScheme === 'dark' ? darkStyles : lightStyles

  url = decodeURIComponent(url)
  const article = news?.find(n => n.url === url)

  return (
    <SafeAreaView style={[styles.container, (isLoading || isError || !article) ? styles.middle : {}]}>
      {
        isLoading && <Text style={styles.color}>{t('fetching')}</Text>
      }

      {
        isError && <Text style={styles.color}>{t('failed_fetch')}</Text>
      }

      {
        !isError && article && (
          <ScrollView style={styles.article}>
            <Text style={styles.heading}>{article.title}</Text>
            <Text style={[styles.publish_info, styles.my_10]}>{t('published')} {new Date(article.publishedAt).toLocaleDateString()} {article.author && `${t('by')} ${article.author}`}</Text>

            <View style={[styles.picContainer, styles.my_10]}>
              <Image source={{ uri: article.urlToImage }} style={styles.picture} />
            </View>

            <Text style={[styles.content, styles.my_10]}>{article.content}</Text>
          </ScrollView>
        )
      }

      {
        !isLoading && !isError && !article && <Text style={styles.color}>Could not find requested article</Text>
      }
    </SafeAreaView>
  )
}

async function fetchNews() {
  const locale = i18n.language
  const response = await fetch(`${API_URL}&language=${locale}`)

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return (await response.json()).articles
}
