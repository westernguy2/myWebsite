import numpy as np
from datascience import *

import matplotlib

import matplotlib.pyplot as plt
plt.style.use('fivethirtyeight')
import warnings
warnings.simplefilter('ignore', FutureWarning)

person_1 = Table().read_table('kunalagarwal2399.csv')

person_1