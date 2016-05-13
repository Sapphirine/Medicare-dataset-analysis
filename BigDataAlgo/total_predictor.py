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


from sklearn import linear_model
import numpy as npy

historical_cost={}
hist={}

# for share in shares:   
#historical_cost['AK'] = [851744, 1553689, 1727034]
with open('total.txt', 'r') as f:
	lines=f.readlines()
	for s in lines:
		print "\n\n",s,":"
		l=[]
		l.append(int(s.split(",")[1]))
		l.append(int(s.split(",")[2]))
		l.append(int(s.split(",")[3]))
		l.append(int(s.split(",")[4]))
		hist[str(s.split(",")[0])]=l
		#print hist
print "***************************************************\n"
#print hist
historical_cost=hist
c=0
#print historical_cost[]
print "[{"
for key in historical_cost.keys():
	length = len(historical_cost[key])
	train_x = npy.array(range(0, length))
	# mean = npy.mean(train_x)
	# std = npy.std(train_x)

	#Performing regularisation on the training data
	train_x = npy.atleast_2d(train_x).T
	y = npy.array(historical_cost[key])

	#Perform cross-validation to get best alpha value
	clf = linear_model.RidgeCV(alphas=[0.1, 1.0, 10.0])
	clf.fit(train_x, y)
	a_param=clf.alpha_

	pred = linear_model.Ridge(alpha = a_param)
	pred.fit(train_x, y)

	# x = npy.atleast_2d(npy.linspace(length, length, num=1)).T
	test_x = npy.array(range(0, length+1))
	# mean = npy.mean(test_x)
	# std = npy.std(test_x)
	# test_x = map(lambda x: (x-mean)/std, test_x)
	test_x = npy.atleast_2d(test_x).T
	# x = npy.reshape(-1, 1)
	predictions = pred.predict(npy.atleast_2d(test_x[length]))    
	#print historical_cost[key], "   ", key,"  Predicted cost: %f\n" %(float(predictions[0]))
	print "\"id\":","\"",key,"\"",",","\"value\":","%.2f"%(float(predictions[0])),
	if c<len(historical_cost.keys())-1:
		print "},{",
	else:
		print "}]"
	c+=1

    
# for x in shares:
#     # share_obj = yahoo.Share(x)
#     # share_obj.refresh()
#     # err = abs((float(predictions[x][0])-float(share_obj.get_price()))/float(share_obj.get_price()))
#     print x
#     # print "Predicted price: %.2f    Curr: %.2f    Error%%: %.2f%%" %(float(predictions[x][0]), float(share_obj.get_price()), float(err*100))
#     print "Predicted price: %.2f" %(float(predictions[x][0]))

# crsr2.close()
# db2.close()