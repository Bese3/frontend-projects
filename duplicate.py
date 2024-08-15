from typing import List

def removeDuplicates(nums: List[int]) -> int:
    number_tracker = 0
    k = 0
    for index, value in enumerate(nums):
        m = index + 1
        for i in nums[m:]:
            if value == i:
                number_tracker += 1
        if number_tracker >= 2:
            # k += number_tracker - 1
            for j in range(m + 1, len(nums)):
                try:
                    nums[j] = nums[j + number_tracker - 1]
                    # print(nums)
                except IndexError:
                    nums[j] = "_"
            nums[len(nums) - 1] = "_"
        number_tracker = 0
    for i in nums:
        if isinstance(i, int):
            k += 1
        continue
    nums = sorted(nums, key=str)
    print(nums)
    return k

print(removeDuplicates([0, 0, 0, 1, 1, 1, 1, 2, 2, 3, 3, 3, 3, 4, 4, 5, 5]))