import { color } from "@rneui/base";
import { Image , Platform, Text, View, SearchBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";
import { Pressable } from "react-native";
import { Image, Platform, Text, View } from "react-native";
import { SearchBar } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native-elements";
import { useState, useEffect} from "react";
import { Pressable, FlatList, Item} from "react-native";
import {supabase} from '../utils/hooks/supabase';
import { SmallChatFill } from "../../assets/snapchat/NavigationIcons";


const Stack = createStackNavigator();

export default function SearchScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [usersToAdd, setUsersToAdd] = useState([]);

  const [recents, setRecents] = useState([]);

  useEffect(() => {
      async function fetchUsers() {
      try {
          const { data, error } = await supabase
          .from('usersToAdd')
          .select('*')
          .limit(8);
          if (error) {
            console.error('Error fetching users:', error.message);
          return;
          }
          if(data) {
              setUsersToAdd(data);
              setRecents(data.slice(-6));
          }
      } catch (error) {
          console.error('Error fetching users:', error.message);
      }
      }
      
      fetchUsers();
  }, []);

  const renderItem = ({ item }) => (
    <View style={{backgroundColor: "#fff",
        // width: 90, borderRadius: 10, gap: 10, paddingVertical: 10, margin: 5
        borderRadius: 10,
        paddingHorizontal: 10,
        margin: 4,
        alignItems: "center",
        width: 175,
        flexDirection:"row",
        height: 50,
        gap: 10,
        }}>
      <Image 
      source={{uri: item.profile_picture}}
      style={{width:50, height:50, borderRadius:50,}}
      />
      <Text >{item.name}</Text>
    </View>
  );



  const renderRecentItem = ({ item }) => (
    <View style={{alignItems: "center", backgroundColor: "white", width: 90, borderRadius: 10, gap: 10, paddingVertical: 15}}>
      <Image
      source={{uri: item.profile_picture}}
      style={{width: 40, height: 40, borderRadius: 40/ 2, backgroundColor:"#EBECEE"}}
      />
      <Text>{item.name}</Text>
      <View style={{flexDirection: "row", alignItems: "center", gap: 2, backgroundColor:"#EBECEE", paddingHorizontal: 10, paddingVertical: 2, borderRadius: 50}}>
          <SmallChatFill width={15} height={15} />
          <Text style={{fontWeight:"bold", fontSize: 12}}>Chat</Text>
      </View>
    </View>
  );

  const renderSnapStar = ({ item }) => (
    <View style={{alignItems: "center", backgroundColor: "white", width: 84, borderRadius: 10, gap: 10, paddingVertical: 10, margin: 5}}>
      <Image
      source={item.profile_picture}
      style={{width: 40, height: 40, borderRadius: 40/ 2, backgroundColor:"#EBECEE"}}
      />
      <Text>{item.name}</Text>
      <View style={{flexDirection: "row", alignItems: "center", gap: 2, backgroundColor:"#EBECEE", paddingHorizontal: 10, paddingVertical: 2, borderRadius: 50}}>
          <SmallChatFill width={15} height={15} />
          <Text style={{fontWeight:"bold", fontSize: 12}}>Chat</Text>
      </View>
    </View>
  );

  return (
    <View styles={{ alignItems: "center", paddingLeft:15}}>
      <SafeAreaView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 10,
            alignItems: "center",
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <SearchBar
            containerStyle={{
              flex: 1,
              width: 100,
              backgroundColor: "transparent",
              borderTopColor: "transparent",
              borderBottomColor: "transparent",
            }}
            inputContainerStyle={{height: 40, backgroundColor: "#EBECEE"}}
            width="100"
            placeholder="Search"
            lightTheme="true"
            round="true"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Pressable
            onPress={() => {
              navigation.navigate("UserTab");
            }}
          >
            <Text style={{fontWeight:"bold"}}> Cancel</Text>
          </Pressable>
        </View>
      </SafeAreaView>

      
      <Text style={{paddingLeft:15, fontWeight:"bold"}}>Best Friends</Text>
      <FlatList
        style={{marginLeft:15, marginRight:15}}
        data={usersToAdd}
        renderItem={renderItem}
        keyExtractor={(item) => item.Username}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        contentContainerStyle={{alignItems: "center", gap: 10, paddingTop:10}}
        scrollEnabled={false}
        // ItemSeparatorComponent={() => <View style={{height: -50, width:"50%", gap:10}} />}
        
      />


      {recents.length > 0 ? (
        <>
          <View style={{justifyContent: "space-between", flexDirection:"row", paddingHorizontal: 15}}>
            <Text style={{fontWeight:"bold", paddingTop:10}}>Recents</Text>
            <Pressable
              onPress={() => {
                setRecents([]);
              }}
            >
              <Text>Clear All &gt;</Text>
            </Pressable>
          </View>

          <FlatList
            data={recents}
            renderItem={renderRecentItem}
            keyExtractor={(item) => item.name}
            horizontal={true}
            contentContainerStyle={{alignItems: "center", gap: 10, paddingHorizontal: 15, paddingTop: 10}}
          />
        </>
      ) : null}

      <Text style={{fontWeight:"bold", paddingLeft: 20, paddingTop: 10}}>Follow a Snap Star</Text>

      <FlatList
        data={snapStars}
        renderItem={renderSnapStar}
        keyExtractor={(item) => item.name}
        numColumns={4}
        // horizontal={true}
        contentContainerStyle={{alignItems: "center", paddingTop: 10, }}
      />


    </View>
  );
}

const snapStars = [{name: "Lindsey", profile_picture: require('../../assets/snapchat/defaultprofile.png')}, {name: "Lara", profile_picture: require('../../assets/snapchat/defaultprofile.png')},  {name: "Nallely", profile_picture: require('../../assets/snapchat/defaultprofile.png')},  {name: "Liz", profile_picture: require('../../assets/snapchat/defaultprofile.png')}, {name: "Cole", profile_picture: require('../../assets/snapchat/defaultprofile.png')}, {name: "Sergio", profile_picture: require('../../assets/snapchat/defaultprofile.png')},  {name: "Winston", profile_picture: require('../../assets/snapchat/defaultprofile.png')},  {name: "Carlos", profile_picture: require('../../assets/snapchat/defaultprofile.png')}, {name: "Gio", profile_picture: require('../../assets/snapchat/defaultprofile.png')}, {name: "Reggie", profile_picture: require('../../assets/snapchat/defaultprofile.png')},  {name: "Gloria", profile_picture: require('../../assets/snapchat/defaultprofile.png')},  {name: "Jenny", profile_picture: require('../../assets/snapchat/defaultprofile.png')}]