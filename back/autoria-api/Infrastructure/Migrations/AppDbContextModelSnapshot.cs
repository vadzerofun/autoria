﻿// <auto-generated />
using System;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Infrastructure.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.7");

            modelBuilder.Entity("Core.Models.Cars", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Car_number")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Car_vin_code")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<double>("Carrying_capacity_ton")
                        .HasColumnType("REAL");

                    b.Property<string>("Color")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreatedTime")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<double>("Engine_capacity")
                        .HasColumnType("REAL");

                    b.Property<int>("Engine_type")
                        .HasColumnType("INTEGER");

                    b.Property<string>("ImagesPath")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Make")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<double>("Mileage")
                        .HasColumnType("REAL");

                    b.Property<string>("Model")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Number_of_seats")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Occasion")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Owners_number")
                        .HasColumnType("INTEGER");

                    b.Property<double>("PriceUSD")
                        .HasColumnType("REAL");

                    b.Property<string>("Road_accident")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Transmission_type")
                        .HasColumnType("INTEGER");

                    b.Property<Guid>("UserId")
                        .HasColumnType("TEXT");

                    b.Property<bool>("Wanted")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Year")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Cars");
                });

            modelBuilder.Entity("Core.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("userRole")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
