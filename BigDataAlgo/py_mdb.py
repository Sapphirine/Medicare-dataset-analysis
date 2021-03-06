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

def get_avg(range):
	if(len(range.split("-")) == 2):
		return (int(range.split("-")[0]) + int(range.split("-")[1]))/2
	else:
		return int(range)


# jdbc_url2 = "jdbc:ucanaccess:///Users/Jivtesh/Downloads/HOSArchive_20101201/Hospital.mdb"
username = ""
password = ""
driver = "net.ucanaccess.jdbc.UcanaccessDriver"

years=[2012, 2013, 2014, 2015]
base="jdbc:ucanaccess:///Users/Jivtesh/Downloads/"
urls=[base+"HOSArchive_20081201/Hospital_2008_12.mdb", base+"HOSArchive_20091201/Hospital_2009_12.mdb", base+"HOSArchive_20101201/Hospital_2010_12.mdb", base+"HOSArchive_20120501/Hospital_2012_05.mdb"]
# jdbc_url1 = "jdbc:ucanaccess:///Users/Jivtesh/Downloads/HOSArchive_20120501/Hospital_2012_05.mdb"
columnName=["`Medicare Payment Range`","`Medicare Payment Range`","`Medicare Average Payment Range`","`Medicare Average Payment Range`"]
count=0 # = 4 for the number of years 
states=[]
states_num=[]
states_total=[]
sorted_states=[]
sorted_count=[]
sorted_total=[]
for url in urls:
	db1 = zxJDBC.connect(url, username, password, driver)
	# db2 = zxJDBC.connect(jdbc_url2, username, password, driver)
	crsr1 = db1.cursor()
	crsr1.execute("SELECT State, "+columnName[count]+", `Number Of Cases` FROM dbo_vwHQI_STATE_MPV_MSR")
	# crsr2 = db2.cursor()
	# crsr2.execute("SELECT City FROM dbo_vwHQI_HOSP")
	# for row in zip(crsr1.fetchall(), crsr2.fetchall()):
	#     print row[0], ",",row[1]
	states.append({})
	states_num.append({})
	for row in crsr1.fetchall():
		if("US-"+str(row[0]) not in states[count]):
			# states[row[0]]=0
			states[count]["US-"+str(row[0])]=get_avg(row[1])
			states_num[count][row[0]] = 0 if row[2]=="*" else int(row[2])
		else:
			states[count]["US-"+str(row[0])]+=get_avg(row[1])
			states_num[count][row[0]] += 0 if row[2]=="*" else int(row[2])
		# print row[0], get_avg(row[1])
	print years[count]," ***************************\n"
	sorted_states.append(sorted(states[count].items(), key=operator.itemgetter(1)))
	print sorted_states[count]
	print "\n*********************************************************************************\n"
	sorted_count.append(sorted(states_num[count].items(), key=operator.itemgetter(1)))
	print sorted_count[count]

	crsr1.close()
	db1.close()
	print "\n*************************************  Printing totals  ************************************\n"

	states_total.append({})
	for state in states_num[count].iteritems():
		total=states_num[count][state[0]]*states[count]["US-"+str(state[0])]
		states_total[count]["US-"+str(state[0])]=total
	sorted_total.append(sorted(states_total[count].items(), key=operator.itemgetter(1)))
	print sorted_total[count]
	print "\nend of ",years[count]," ***************************\n"
	count+=1

f=open("spend.txt","w")

for val in states[0].iteritems():
	s=str(val[0])+","+str(val[1])+","+str(states[1][val[0]])+","+str(states[2][val[0]])+","+str(states[3][val[0]])+"\n"
	print s
	f.write(s)

#File close?
f.close()
f=open("total.txt","w")

for val in states_total[0].iteritems():
	s=str(val[0])+","+str(val[1])+","+str(states_total[1][val[0]])+","+str(states_total[2][val[0]])+","+str(states_total[3][val[0]])+"\n"
	print s
	f.write(s)

#File close?
f.close()
