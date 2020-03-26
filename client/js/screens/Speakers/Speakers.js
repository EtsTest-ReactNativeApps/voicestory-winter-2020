import React from 'react';
import {TouchableOpacity, View, Image, Text} from 'react-native';

// import Text from '../../components/CustomText/CustomText';
import {SectionList} from 'react-native';
import styles from './styles';

const formatSessionData = users => {
  const formattedData = users
    .reduce((acc, curr) => {
      const nameExists = acc.find(
        section => section.title === curr.name.charAt(0).toUpperCase(),
      );
      nameExists
        ? nameExists.data.push(curr)
        : acc.push({title: curr.name.charAt(0).toUpperCase(), data: [curr]});
      return acc;
    }, [])
    .sort((a, b) => b.title - a.title);
  return formattedData;
};

const Speakers = ({users, navigation}) => {
  users = users.filter(user => user.isSpeaker != null);
  return (
    users && (
      <View style={styles.container}>
        <SectionList
          style={styles.content}
          sections={formatSessionData(users)}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.speaker}
              onPress={() =>
                navigation.navigate('SpeakerProfile', {speaker: item.isSpeaker})
              }>
              <Image
                source={
                  item.isSpeaker.profile_picture
                    ? {uri: item.isSpeaker.profile_picture}
                    : {uri: 'https://placedog.net/500'}
                }
                style={styles.image}
              />
              <View style={styles.information}>
                <Text style={styles.name}>{item.name}</Text>
                <Text numberOfLines={1} style={styles.title}>
                  {item.isSpeaker.title}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.header}>{title}</Text>
          )}
          stickySectionHeadersEnabled={false}
        />
      </View>
    )
  );
};

export default Speakers;
