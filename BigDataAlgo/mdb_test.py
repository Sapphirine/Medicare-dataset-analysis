"""
/***************************************************
Copyright (C) 2016  
Authors: Siri Haricharan
         Jivtesh Singh

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
    
*************************************************/
"""
from com.ziclix.python.sql import zxJDBC
import operator

# def get_num(range):
# 	if(len(range.split("-")) == 2):
# 		return (int(range.split("-")[0]) + int(range.split("-")[1]))/2
# 	else:
# 		return int(range)

def get_num(range):
	return (int(range.split("$")[1].replace(',', '')))



# jdbc_url2 = "jdbc:ucanaccess:///Users/Jivtesh/Downloads/HOSArchive_20101201/Hospital.mdb"
username = ""
password = ""
driver = "net.ucanaccess.jdbc.UcanaccessDriver"

# years=[2008, 2009, 2010, 2012]
base="jdbc:ucanaccess:///Users/Jivtesh/Downloads/"
url=base+"HOSArchive_20150506/Hospital_2015_05.mdb"
# urls=[base+"HOSArchive_20081201/Hospital_2008_12.mdb", base+"HOSArchive_20091201/Hospital_2009_12.mdb", base+"HOSArchive_20101201/Hospital_2010_12.mdb", base+"HOSArchive_20120501/Hospital_2012_05.mdb"]
# columnName=["`Medicare Payment Range`","`Medicare Payment Range`","`Medicare Average Payment Range`","`Medicare Average Payment Range`"]
columnName="`Avg Spending Per Episode (Hospital)`"
count=0
states={}
# states_num=[]
sorted_states=[]
# sorted_count=[]

db1 = zxJDBC.connect(url, username, password, driver)
# db2 = zxJDBC.connect(jdbc_url2, username, password, driver)
crsr1 = db1.cursor()
crsr1.execute("SELECT State, "+columnName+" FROM `Medicare Hospital Spending by Claim` WHERE `Claim Type` = 'Total'")
# crsr2 = db2.cursor()
# crsr2.execute("SELECT City FROM dbo_vwHQI_HOSP")
# for row in zip(crsr1.fetchall(), crsr2.fetchall()):
#     print row[0], ",",row[1]
# states.append({})
# states_num.append({})
for row in crsr1.fetchall():
	if(row[0] not in states):
		# states[row[0]]=0
		states[row[0]]=get_num(row[1])
		# states_num[row[0]] = 0 if row[2]=="*" else int(row[2])
	else:
		states[row[0]]+=get_num(row[1])
		# states_num[row[0]] += 0 if row[2]=="*" else int(row[2])
	# print row[0], get_num(row[1])
print " ***************************\n"
sorted_states.append(sorted(states.items(), key=operator.itemgetter(1)))
print sorted_states
# print "\n*********************************************************************************\n"
# sorted_count.append(sorted(states_num.items(), key=operator.itemgetter(1)))
# print sorted_count
crsr1.close()
db1.close()
# print "\nend of ",years," ***************************\n"
# count+=1
# crsr2.close()
# db2.close()